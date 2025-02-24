

namespace KokoType.LessonService.DAL.Models
{
    public class LessonPage
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }
        public int ErrorCount { get; set; }

        public Guid lesson { get; set; }
    }
}
