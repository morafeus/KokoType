using KokoType.LessonService.DAL.Context;
using KokoType.LessonService.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.LessonService.DAL.Repositories
{
    public class LessonResultRepository : BaseRepository<LessonResult>
    {
        public LessonResultRepository(IDbContextFactory<LessonContext> context) : base(context)
        {
        }

        public async Task<bool> CheckIsExist(Guid lessonId, Guid userId)
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                return !await context.Set<LessonResult>()
                    .AnyAsync(x => x.LessonId == lessonId && x.UserId == userId);
            }
        }

        public async Task<List<LessonResult>> GetByUser(Guid userId)
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                return await context.Set<LessonResult>()
                    .Where(x => x.UserId == userId)
                    .ToListAsync();
            }
        }
    }
}