using KokoType.LessonService.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.LessonService.DAL.Repositories
{
    public class LessonRepository : BaseRepository<LessonModel>
    {
        public LessonRepository(DbContext context) : base(context) { }
    }
}
