using KokoType_DAL_Lesson.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_Lesson.Context
{
    public class LessonContext : DbContext
    {
        DbSet<Lesson> Lessons { get; set; }
        DbSet<LessonPage> LessonPages { get; set; }
        DbSet<LessonResult> LessonResults { get; set; }

        public LessonContext(DbContextOptions<LessonContext> options) : base(options) { }
    }
}
