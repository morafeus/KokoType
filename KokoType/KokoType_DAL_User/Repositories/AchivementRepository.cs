using KokoType_DAL_User.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType_DAL_User.Repositories
{
    public class AchivementRepository : BaseRepository<Achivement>
    {
        public AchivementRepository(DbContext context) : base(context) { }
    }
}
