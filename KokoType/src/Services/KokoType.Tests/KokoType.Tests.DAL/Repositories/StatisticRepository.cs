using KokoType.Tests.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.Tests.DAL.Repositories
{
    public class StatisticRepository : BaseRepository<Statistic>
    {
        public StatisticRepository(DbContext context) : base(context) { }
    }
}
