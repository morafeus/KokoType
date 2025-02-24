using KokoType.LessonService.DAL.Models;

namespace KokoType.LessonService.BLL.DTO
{
    public class LessonModelDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }

        public List<LessonPage> Pages { get; set; }
    }
}
