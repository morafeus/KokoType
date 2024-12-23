using KokoType.Lesson.DAL.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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

        public async Task<bool> CheckIsExist(Guid lessonId, Guid userId)
        {
            LessonResult result =  _table.FirstOrDefault(x => x.Lesson.Id == lessonId && x.UserId == userId);
            if (result != null)
                return false;
            else 
                return true;
        }

        public async Task<List<LessonResult>> GetByUser(Guid userId)
        {
            return await _table
                .Include(x => x.Lesson)
                .Where(x => x.UserId.Equals(userId))
                .ToListAsync();
        }
    }
}
