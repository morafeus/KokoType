using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_Lesson.Models
{
    public class LessonPage
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }

        public Lesson lesson { get; set; }
    }
}
