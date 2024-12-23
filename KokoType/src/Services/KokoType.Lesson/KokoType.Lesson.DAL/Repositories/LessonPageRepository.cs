using KokoType.Lesson.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
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

        public async Task<List<LessonPage>> GetPagesByLesson(LessonModel model)
        {
            return await _table.Where(x => x.lesson.Equals(model.Id)).ToListAsync();
        }
    }
}
