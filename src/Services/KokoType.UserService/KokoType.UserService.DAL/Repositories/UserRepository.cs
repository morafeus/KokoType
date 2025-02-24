using KokoType.UserService.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.UserService.DAL.Repositories
{
    public class UserRepository : BaseRepository<UserModel>
    {
        public UserRepository(DbContext context) : base(context) { }

        public async Task<UserModel> GetByName(string name)
        {
            return await _table.FirstOrDefaultAsync(x => x.UserName == name);
        }
    }
}
