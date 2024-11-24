using KokoType_DAL_Lesson.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType_DAL_Lesson.Repositories
{
    public class LessonPageRepository : BaseRepository<LessonPage>
    {
        public LessonPageRepository(DbContext context) : base(context)
        {
        }
    }
}
