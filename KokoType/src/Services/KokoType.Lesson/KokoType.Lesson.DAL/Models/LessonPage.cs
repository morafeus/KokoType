using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Lesson.DAL.Models
{
    public class LessonPage
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }

        public LessonModel lesson { get; set; }
    }
}
