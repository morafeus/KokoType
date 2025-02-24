using KokoType.UserService.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType.UserService.DAL.Repositories
{
    public class AchivementRepository : BaseRepository<Achivement>
    {
        public AchivementRepository(DbContext context) : base(context) { }
    }
}
