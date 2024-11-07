using KokoType_DAL_Lesson.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType_DAL_Lesson.Repositories
{
    public class LessonRepository : BaseRepository<Lesson>
    {
        public LessonRepository(DbContext context) : base(context)
        {
        }
    }
}
