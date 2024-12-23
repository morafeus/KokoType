using KokoType.Lesson.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Lesson.BLL.DTO
{
    public class LessonModelDTO
    { 
        public string Name { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }

        public List<LessonPage> Pages { get; set; }
    }

}
