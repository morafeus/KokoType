using KokoType.LessonService.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.LessonService.DAL.Context
{
    public class LessonContext : DbContext
    {
        DbSet<LessonModel> Lessons { get; set; }
        DbSet<LessonPage> LessonPages { get; set; }
        DbSet<LessonResult> LessonResults { get; set; }

        public LessonContext(DbContextOptions<LessonContext> options) : base(options) { }
    }
}
