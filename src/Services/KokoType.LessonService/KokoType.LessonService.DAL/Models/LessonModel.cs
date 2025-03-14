

namespace KokoType.LessonService.DAL.Models
{
    public class LessonModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }

        public Guid? NextLessonId {  get; set; }
        public Guid? PreviousLessonId { get; set; }

        public string status { get; set; }

        public List<LessonPage> Pages { get; set; }
    }
}
