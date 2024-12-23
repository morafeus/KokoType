using KokoType.Lesson.BLL.DTO;
using KokoType.Lesson.BLL.Interfaces;
using KokoType.Lesson.DAL.Interfaces;
using KokoType.Lesson.DAL.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace KokoType.Lesson.BLL.Service
{
    public class LessonService : ILessonService
    {
        private IUnitOfWork _unitOfWork;

        public LessonService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<LessonModel> AddNewLesson(LessonModelDTO lesson)
        {
            try
            {
                LessonModel model = new LessonModel()
                {
                    Id = Guid.NewGuid(),
                    Name = lesson.Name,
                    Description = lesson.Description,
                    Pages = lesson.Pages,
                    Language = lesson.Language,
                    status = "available"
                };
                foreach (var page in model.Pages)
                {
                    page.Id = Guid.NewGuid();
                    page.lesson = model.Id;
                }
                await _unitOfWork.LessonRepository.Add(model);
                return model;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task CompleteLesson(CompleteLessonDTO complete)
        {
            try
            {
                LessonModel lesson = await _unitOfWork.LessonRepository.GetById(complete.Id);
                LessonResult lessonResult = new LessonResult() { Id = Guid.NewGuid(), Lesson = lesson, UserId = complete.UserId };
                bool check = await _unitOfWork.LessonResultRepository.CheckIsExist(lesson.Id, complete.UserId);
                if (check)
                    await _unitOfWork.LessonResultRepository.Add(lessonResult);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteLesson(DeleteLessonDTO lessonDto)
        {
            try
            {
                LessonModel lesson = await _unitOfWork.LessonRepository.GetById(lessonDto.Id);
                List<LessonPage> pages = await _unitOfWork.LessonPageRepository.GetPagesByLesson(lesson);
                foreach(var page in pages)
                {
                    await _unitOfWork.LessonPageRepository.Delete(page);
                }
                await _unitOfWork.LessonRepository.Delete(lesson);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<LessonModel>> GetAllLessons(DeleteLessonDTO user)
        {
            try
            {
                List<LessonModel> lessons = (await _unitOfWork.LessonRepository.GetAll()).ToList();
                List<LessonResult> results = await _unitOfWork.LessonResultRepository.GetByUser(user.Id);
                HashSet<Guid> completedLessonIds = new HashSet<Guid>(results.Select(r => r.Lesson.Id));
                foreach (var lesson in lessons)
                {
                    lesson.Pages = await _unitOfWork.LessonPageRepository.GetPagesByLesson(lesson);
                    // Проверяем, завершен ли урок
                    lesson.status = completedLessonIds.Contains(lesson.Id) ? "done" : "available";
                }

                return lessons;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
