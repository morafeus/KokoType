
using KokoType.Lesson.DAL.Repositories;

namespace KokoType.Lesson.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        public LessonRepository LessonRepository { get; }
        public LessonPageRepository LessonPageRepository { get; }
        public LessonResultRepository LessonResultRepository { get; }
    }
}
