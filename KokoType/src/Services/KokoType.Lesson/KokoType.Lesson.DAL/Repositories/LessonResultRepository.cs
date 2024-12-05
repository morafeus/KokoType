using KokoType.Lesson.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Lesson.DAL.Repositories
{
    public class LessonResultRepository : BaseRepository<LessonResult>
    {
        public LessonResultRepository(DbContext context) : base(context)
        {
        }
    }
}
