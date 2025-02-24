using KokoType.LessonService.BLL.DTO;
using KokoType.LessonService.DAL.Models;

namespace KokoType.LessonService.BLL.Interfaces
{
    public interface ILessonService
    {
        public Task<LessonModel> AddNewLesson(LessonModelDTO lesson);
        public Task DeleteLesson(DeleteLessonDTO lesson);
        public Task<List<LessonModel>> GetAllLessons(DeleteLessonDTO user);
        public Task CompleteLesson(CompleteLessonDTO complete);
    }
}
