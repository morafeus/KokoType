using KokoType_DAL_Test.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType_DAL_Test.Repositories
{
    public class LessonPageRepository : BaseRepository<LessonPage>
    {
        public LessonPageRepository(DbContext context) : base(context)
        {
        }
    }
}
