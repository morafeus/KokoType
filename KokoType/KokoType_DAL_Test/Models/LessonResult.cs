using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_Test.Models
{
    public class LessonResult
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Lesson Lesson { get; set; }
    }
}
