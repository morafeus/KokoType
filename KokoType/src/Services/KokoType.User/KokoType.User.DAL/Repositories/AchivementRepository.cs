using KokoType.User.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.User.DAL.Repositories
{
    public class AchivementRepository : BaseRepository<Achivement>
    {
        public AchivementRepository(DbContext context) : base(context) { }
    }
}
