using KokoType_DAL_User.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType_DAL_User.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(DbContext context) : base(context) { }
    }
}
