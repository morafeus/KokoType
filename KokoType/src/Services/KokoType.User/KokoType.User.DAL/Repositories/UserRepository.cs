using KokoType.User.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.User.DAL.Repositories
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
