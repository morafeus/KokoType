using KokoType.User.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.User.DAL.Repositories
{
    public class RoleRepository : BaseRepository<Role>
    {
        public RoleRepository(DbContext context) : base(context) { }

        public async Task<Role> GetRoleByUserAsync(Guid userId)
        {
            return await _table.FirstOrDefaultAsync(x => x.User.Id == userId);
        }
    }
}
