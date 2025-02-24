using KokoType.LessonService.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType.LessonService.DAL.Repositories
{
    public class LessonResultRepository : BaseRepository<LessonResult>
    {
        public LessonResultRepository(DbContext context) : base(context)
        {
        }

        public async Task<bool> CheckIsExist(Guid lessonId, Guid userId)
        {
            LessonResult result = _table.FirstOrDefault(x => x.Lesson.Id == lessonId && x.UserId == userId);
            if (result != null)
                return false;
            else
                return true;
        }

        public async Task<List<LessonResult>> GetByUser(Guid userId)
        {
            return await _table
                .Include(x => x.Lesson)
                .Where(x => x.UserId.Equals(userId))
                .ToListAsync();
        }
    }
}
