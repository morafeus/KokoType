
using KokoType.UserService.BLL.DTO;
using KokoType.UserService.DAL.ViewModels;

namespace KokoType.UserService.BLL.Interfaces
{
    public interface ITokenService
    {
        TokenModel GenerateTokens(TokenUserDTO tokenUser);
        public bool ValidateRefreshToken(string refreshToken);
    }
}
