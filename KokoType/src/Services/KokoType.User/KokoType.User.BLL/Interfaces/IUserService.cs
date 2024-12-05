using KokoType.User.BLL.DTO;

namespace KokoType.User.BLL.Interfaces
{
    public interface IUserService
    {
        Task CreateUserAsync(UserModelDTO user);
    }
}
