
using KokoType.UserService.BLL.DTO;

namespace KokoType.UserService.BLL.Interfaces
{
    public interface ITokenService
    {
        TokenModel GenerateTokens(TokenUserDTO tokenUser);
        public bool ValidateRefreshToken(string refreshToken);
    }
}
