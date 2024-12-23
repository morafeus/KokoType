using KokoType.User.BLL.DTO;
using KokoType.User.DAL.Models;

namespace KokoType.User.BLL.Interfaces
{
    public interface IUserService
    {
        public Task CreateUserAsync(UserModelDTO user);
        public Task DeleteUserAsync(DeleteUserModelDTO user);
        public Task<TokenModel> SignIn(LoginUserModelDTO userModel);
        public Task<TokenModel> RefreshToken(RefreshDTO refreshDTO);
        public Task LogoutUser(DeleteUserModelDTO user);
        public Task<UserModel> GetMe(DeleteUserModelDTO deleteUserModelDTO);
        public Task<UserModel> UpdateLvl(UpdateUserLvlDTO userModel);
        public Task<UserModel> UpdateUser(UpdateUserDTO userModel);
        public Task<List<UserModel>> GetUsers();
    }
}
