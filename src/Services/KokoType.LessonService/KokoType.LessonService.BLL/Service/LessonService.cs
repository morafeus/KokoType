using AutoMapper;
using KokoType.LessonService.BLL.DTO;
using KokoType.LessonService.BLL.Interfaces;
using KokoType.LessonService.DAL.Interfaces;
using KokoType.LessonService.DAL.Models;

namespace KokoType.LessonService.BLL.Service
{
    public class LessonService : ILessonService
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public LessonService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<LessonModel> AddNewLesson(LessonModelDTO lesson)
        {
            try
            {
                LessonModel model = _mapper.Map<LessonModel>(lesson);
                model.Id = Guid.NewGuid();

                foreach (var page in model.Pages)
                {
                    page.Id = Guid.NewGuid();
                    page.lesson = model.Id;
                }

                var previousLesson = await _unitOfWork.LessonRepository.GetLastLessonByLanguage(model.Language); 

                if (previousLesson != null)
                {
                    model.PreviousLessonId = previousLesson.Id;
                    previousLesson.NextLessonId = model.Id;
                    _unitOfWork.LessonRepository.Update(previousLesson);
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
                LessonResult lessonResult = _mapper.Map<LessonResult>(complete);
                lessonResult.LessonId = lesson.Id;
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
                List<LessonPage> pages = await _unitOfWork.LessonPageRepository.GetPagesByLessonId(lesson.Id);
                foreach (var page in pages)
                {
                    await _unitOfWork.LessonPageRepository.Delete(page);
                }

                LessonModel previous = null;
                LessonModel next = null;

                if (lesson.PreviousLessonId.HasValue)
                {
                    previous = await _unitOfWork.LessonRepository.GetById(lesson.PreviousLessonId.Value);
                }

                if (lesson.NextLessonId.HasValue)
                {
                    next = await _unitOfWork.LessonRepository.GetById(lesson.NextLessonId.Value);
                }

                if (previous != null && next != null)
                {
                    previous.NextLessonId = next.Id;
                    next.PreviousLessonId = previous.Id;
                    await _unitOfWork.LessonRepository.Update(previous);
                    await _unitOfWork.LessonRepository.Update(next);
                }
                else if (previous != null)
                {
                    previous.NextLessonId = null;
                    await _unitOfWork.LessonRepository.Update(previous);
                }
                else if (next != null)
                {
                    next.PreviousLessonId = null;
                    await _unitOfWork.LessonRepository.Update(next);
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

                HashSet<Guid> completedLessonIds = new HashSet<Guid>(results.Select(r => r.LessonId));
                var lessonsByLanguage = lessons.GroupBy(l => l.Language);
                List<LessonModel> sortedAllLessons = new List<LessonModel>();

                foreach (var languageGroup in lessonsByLanguage)
                {
                    var sortedLessons = SortLessons(languageGroup.ToList());
                    sortedLessons.Reverse();

                    bool foundLastDone = false;

                    foreach (var lesson in sortedLessons)
                    {
                        if (lesson.PreviousLessonId == null)
                        {
                            lesson.status = "available";
                        }

                        if (completedLessonIds.Contains(lesson.Id))
                        {
                            lesson.status = "done";
                            if (lesson.NextLessonId.HasValue && !completedLessonIds.Contains(lesson.NextLessonId.Value))
                                foundLastDone = true;
                        }
                        else if (foundLastDone)
                        {
                            lesson.status = "available";
                            foundLastDone = false;
                        }

                        lesson.Pages = await _unitOfWork.LessonPageRepository.GetPagesByLessonId(lesson.Id);
                        sortedAllLessons.Add(lesson);
                    }
                }

                return sortedAllLessons;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Метод для сортировки уроков по их связям
        private List<LessonModel> SortLessons(List<LessonModel> lessons)
        {
            var lessonDict = lessons.ToDictionary(l => l.Id);
            var sortedLessons = new List<LessonModel>();
            var visited = new HashSet<Guid>();

            foreach (var lesson in lessons)
            {
                if (!visited.Contains(lesson.Id))
                {
                    SortHelper(lesson, lessonDict, sortedLessons, visited);
                }
            }

            return sortedLessons;
        }

        // Вспомогательный метод для рекурсивной сортировки
        private void SortHelper(LessonModel lesson, Dictionary<Guid, LessonModel> lessonDict, List<LessonModel> sortedLessons, HashSet<Guid> visited)
        {
            if (visited.Contains(lesson.Id))
                return;

            visited.Add(lesson.Id);

            // Рекурсивно добавляем следующий урок
            if (lessonDict.TryGetValue(lesson.NextLessonId ?? Guid.Empty, out var nextLesson))
            {
                SortHelper(nextLesson, lessonDict, sortedLessons, visited);
            }

            // Добавляем текущий урок в отсортированный список
            sortedLessons.Add(lesson);
        }
    }
}
