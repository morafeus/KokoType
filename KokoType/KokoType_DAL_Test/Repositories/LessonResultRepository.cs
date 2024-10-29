using KokoType_DAL_Test.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType_DAL_Test.Repositories
{
    public class LessonResultRepository : BaseRepository<LessonResult>
    {
        public LessonResultRepository(DbContext context) : base(context)
        {
        }
    }
}
