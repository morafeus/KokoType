using KokoType_DAL_User.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType_DAL_User.Repositories
{
    public class RoleRepository : BaseRepository<Role>
    {
        public RoleRepository(DbContext context) : base(context) { }
    }
}
