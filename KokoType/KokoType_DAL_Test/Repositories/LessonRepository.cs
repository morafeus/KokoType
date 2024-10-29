using KokoType_DAL_Test.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType_DAL_Test.Repositories
{
    public class LessonRepository : BaseRepository<Lesson>
    {
        public LessonRepository(DbContext context) : base(context)
        {
        }
    }
}
