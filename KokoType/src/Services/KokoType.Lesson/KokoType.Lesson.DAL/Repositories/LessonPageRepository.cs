using KokoType.Lesson.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Lesson.DAL.Repositories
{
    public class LessonPageRepository : BaseRepository<LessonPage>
    {
        public LessonPageRepository(DbContext context) : base(context)
        {
        }
    }
}
