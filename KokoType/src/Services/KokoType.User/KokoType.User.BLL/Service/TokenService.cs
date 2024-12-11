using KokoType.User.BLL.DTO;
using KokoType.User.BLL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static KokoType.User.BLL.DTO.TokenUserDTO;

namespace KokoType.User.BLL.Service
{
    public class TokenService : ITokenService
    {
        private readonly string _key;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly int _accessTokenExpireMinutes;
        private readonly int _refreshTokenExpireDays;

        public TokenService(IConfiguration configuration)
        {
            _key = configuration["Jwt:Key"];
            _issuer = configuration["Jwt:Issuer"];
            _audience = configuration["Jwt:Audience"];
            _accessTokenExpireMinutes = int.Parse(configuration["Jwt:AccessTokenExpireMinutes"]);
            _refreshTokenExpireDays = int.Parse(configuration["Jwt:RefreshTokenExpireDays"]);
        }

        public TokenModel GenerateTokens(TokenUserDTO user)
        {
            var accessToken = GenerateAccessToken(user);
            var refreshToken = GenerateRefreshToken(user);

            return new TokenModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public bool ValidateRefreshToken(string refreshToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key)),
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                tokenHandler.ValidateToken(refreshToken, tokenValidationParameters, out var validatedToken);
                var jwtToken = validatedToken as JwtSecurityToken;
                if (jwtToken == null || !jwtToken.Claims.Any(c => c.Type == "type" && c.Value == "refresh"))
                {
                    return false; 
                }

                return true; 
            }
            catch (SecurityTokenExpiredException)
            {
                return false; 
            }
            catch
            {
                return false; 
            }
        }

        private string GenerateAccessToken(TokenUserDTO user)
        {
            var claims = new[]
            {
                new Claim("Id", user.Id.ToString()),
                new Claim("UserName", user.UserName),
                new Claim("UserLvl", user.UserLvl.ToString()),
                new Claim("UserExp", user.UserExp.ToString()),
                new Claim("MaxExp", (user.UserLvl * 1000 + 1000).ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_accessTokenExpireMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken(TokenUserDTO user)
        {
            var claims = new[]
            {
            new Claim("Id", user.Id.ToString()),
            new Claim("UserName", user.UserName),
            new Claim("type", "refresh")
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.Now.AddDays(_refreshTokenExpireDays),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

       
    }
}
