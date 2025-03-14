

namespace KokoType.LessonService.DAL.Models
{
    public class LessonResult
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Details { get; set; }
        public Guid LessonId { get; set; }
    }
}
