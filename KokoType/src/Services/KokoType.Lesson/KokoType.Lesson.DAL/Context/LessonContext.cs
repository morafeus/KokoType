using KokoType.Lesson.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Lesson.DAL.Context
{
    public class LessonContext : DbContext
    {
        DbSet<LessonModel> Lessons { get; set; }
        DbSet<LessonPage> LessonPages { get; set; }
        DbSet<LessonResult> LessonResults { get; set; }

        public LessonContext(DbContextOptions<LessonContext> options) : base(options) { }
    }
}
