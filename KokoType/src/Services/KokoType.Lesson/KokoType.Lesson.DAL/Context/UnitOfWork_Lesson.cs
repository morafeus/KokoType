using KokoType.Lesson.DAL.Interfaces;
using KokoType.Lesson.DAL.Repositories;


namespace KokoType.Lesson.DAL.Context
{
    internal class UnitOfWork_Lesson : IUnitOfWork
    {
        private LessonRepository lessonRepository;
        private LessonPageRepository lessonPageRepository;
        private LessonResultRepository lessonResultRepository;

        private LessonContext _context;



        public LessonRepository LessonRepository
        {
            get
            {
                if (lessonRepository == null)
                    lessonRepository = new LessonRepository(_context);
                return lessonRepository;
            }
        }

        public LessonPageRepository LessonPageRepository
        {
            get
            {
                if (lessonPageRepository == null)
                    lessonPageRepository = new LessonPageRepository(_context);
                return lessonPageRepository;
            }
        }

        public LessonResultRepository LessonResultRepository
        {
            get
            {
                if (lessonResultRepository == null)
                    lessonResultRepository = new LessonResultRepository(_context);
                return lessonResultRepository;
            }
        }

        public UnitOfWork_Lesson(LessonContext testContext)
        {
            _context = testContext;
        }
    }
}
