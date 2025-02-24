
using KokoType.LessonService.DAL.Repositories;

namespace KokoType.LessonService.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        public LessonRepository LessonRepository { get; }
        public LessonPageRepository LessonPageRepository { get; }
        public LessonResultRepository LessonResultRepository { get; }
    }
}
