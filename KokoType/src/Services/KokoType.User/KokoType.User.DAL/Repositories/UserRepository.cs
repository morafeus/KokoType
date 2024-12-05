using KokoType.User.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.User.DAL.Repositories
{
    public class UserRepository : BaseRepository<UserModel>
    {
        public UserRepository(DbContext context) : base(context) { }
    }
}
