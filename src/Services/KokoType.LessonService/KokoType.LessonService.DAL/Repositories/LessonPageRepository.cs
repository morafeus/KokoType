using KokoType.LessonService.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType.LessonService.DAL.Repositories
{
    public class LessonPageRepository : BaseRepository<LessonPage>
    {
        public LessonPageRepository(DbContext context) : base(context)
        {
        }

        public async Task<List<LessonPage>> GetPagesByLesson(LessonModel model)
        {
            return await _table.Where(x => x.lesson.Equals(model.Id)).ToListAsync();
        }
    }
}
