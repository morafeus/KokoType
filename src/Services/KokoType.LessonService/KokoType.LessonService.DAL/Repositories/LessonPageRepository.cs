using KokoType.LessonService.DAL.Context;
using KokoType.LessonService.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType.LessonService.DAL.Repositories
{
    public class LessonPageRepository : BaseRepository<LessonPage>
{
    public LessonPageRepository(IDbContextFactory<LessonContext> _contextFactory) : base(_contextFactory) { }

    public async Task<List<LessonPage>> GetPagesByLessonId(Guid lessonId)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return await context.Set<LessonPage>()
                .Where(lp => lp.lesson == lessonId)
                .OrderBy(lp => lp.Title)
                .ToListAsync();
        }
    }
}
}
