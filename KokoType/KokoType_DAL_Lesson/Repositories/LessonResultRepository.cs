using KokoType_DAL_Lesson.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType_DAL_Lesson.Repositories
{
    public class LessonResultRepository : BaseRepository<LessonResult>
    {
        public LessonResultRepository(DbContext context) : base(context)
        {
        }
    }
}
