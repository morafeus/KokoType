using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.LessonService.BLL.DTO
{
    public class CompleteLessonDTO
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Details { get; set; }
    }
}
