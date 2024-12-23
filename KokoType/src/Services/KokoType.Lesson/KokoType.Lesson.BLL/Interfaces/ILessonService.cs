using KokoType.Lesson.BLL.DTO;
using KokoType.Lesson.DAL.Models;

namespace KokoType.Lesson.BLL.Interfaces
{
    public interface ILessonService
    {
        public Task<LessonModel> AddNewLesson(LessonModelDTO lesson);
        public Task DeleteLesson(DeleteLessonDTO lesson);
        public Task<List<LessonModel>> GetAllLessons(DeleteLessonDTO user);
        public Task CompleteLesson(CompleteLessonDTO complete);
    }
}
