using KokoType.Tests.DAL.Models;
using Microsoft.EntityFrameworkCore;
using ZstdSharp.Unsafe;

namespace KokoType.Tests.DAL.Repositories
{
    public class StatisticRepository : BaseRepository<Statistic>
    {
        public StatisticRepository(DbContext context) : base(context) { }

        public async Task<List<Statistic>> GetByUser(Guid userId, string decription)
        {
            return _table.Where(x => x.UserId.Equals(userId) && x.Decription.Equals(decription)).ToList<Statistic>();
        }

        public async Task<StatsModel> GetBestStats(Guid userId)
        {
            var statistics = await _table
                .Where(x => x.UserId == userId)
                .ToListAsync();

            StatsModel model = new StatsModel();

            if (statistics.Any())
            {
                model.Accuracy = statistics.Max(x => x.Accuracy);
                model.Speed = statistics.Max(x => x.Speed);
                model.TestCount = statistics.Count;
            }
            else
            {
                model.Accuracy = 0;
                model.Speed = 0;
                model.TestCount = 0;
            }

            return model;
        }
    }
}
