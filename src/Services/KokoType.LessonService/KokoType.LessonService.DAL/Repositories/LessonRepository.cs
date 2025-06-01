using KokoType.LessonService.DAL.Context;
using KokoType.LessonService.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.LessonService.DAL.Repositories
{
    public class LessonRepository : BaseRepository<LessonModel>
    {
        public LessonRepository(IDbContextFactory<LessonContext> context) : base(context) { }

        public async Task<LessonModel> GetLastLessonByLanguage(string language)
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                return await context.Set<LessonModel>()
                    .Where(l => l.Language == language && l.NextLessonId == null)
                    .FirstOrDefaultAsync();
            }
        }
    }
}