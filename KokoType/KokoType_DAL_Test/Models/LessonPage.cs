

namespace KokoType_DAL_Test.Models
{
    public class LessonPage
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }

        public Lesson lesson { get; set; }
    }
}
