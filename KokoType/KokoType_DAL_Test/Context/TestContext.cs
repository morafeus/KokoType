

using KokoType_DAL_Test.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType_DAL_Test.Context
{
    public class TestContext : DbContext
    {
        DbSet<Statistic> Statistics { get; set; }
        DbSet<Lesson> Lessons { get; set; }
        DbSet<LessonPage> LessonsPage { get; set; }
        DbSet<LessonResult> LessonsResult { get; set; }

        public TestContext(DbContextOptions<TestContext> options) : base(options) { }
    }
}
