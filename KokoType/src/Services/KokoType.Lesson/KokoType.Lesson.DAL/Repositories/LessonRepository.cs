using KokoType.Lesson.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType.Lesson.DAL.Repositories
{
    public class LessonRepository : BaseRepository<LessonModel>
    {
        public LessonRepository(DbContext context) : base(context) { }
    }

}
