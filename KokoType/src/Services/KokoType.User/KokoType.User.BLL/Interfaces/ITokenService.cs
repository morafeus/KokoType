
using KokoType.User.BLL.DTO;
using KokoType.User.DAL.Models;
using System.Security.Claims;


namespace KokoType.User.BLL.Interfaces
{
    public interface ITokenService
    {
        TokenModel GenerateTokens(TokenUserDTO tokenUser);
        public bool ValidateRefreshToken(string refreshToken);
    }
}
