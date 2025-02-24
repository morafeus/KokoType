

namespace KokoType.UserService.BLL.Interfaces
{
    public interface IHashService
    {
        string HashPassword(string password, out byte[] salt);
        bool VerifyPassword(string password, string hash, byte[] salt);
    }
}
