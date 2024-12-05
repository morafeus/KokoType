using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Lesson.DAL.Models
{
    public class LessonResult
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public LessonModel Lesson { get; set; }
    }
}
