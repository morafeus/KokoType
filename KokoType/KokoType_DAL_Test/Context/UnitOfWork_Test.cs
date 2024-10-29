using KokoType_DAL_Test.Interfaces;
using KokoType_DAL_Test.Repositories;


namespace KokoType_DAL_Test.Context
{
    public class UnitOfWork_Test : IUnitOfWork
    {
        private StatisticRepository statisticRepository;
        private LessonRepository lessonRepository;
        private LessonPageRepository lessonPageRepository;
        private LessonResultRepository lessonResultRepository;

        private TestContext _context;

        public StatisticRepository StatisticRepository
        {
            get
            {
                if (statisticRepository == null)
                    statisticRepository = new StatisticRepository(_context);
                return statisticRepository;
            }
        }

        public LessonRepository LessonRepository
        {
            get
            {
                if( lessonRepository == null)
                    lessonRepository = new LessonRepository(_context);
                return lessonRepository;
            }
        }

        public LessonPageRepository LessonPageRepository
        {
            get
            {
                if(lessonPageRepository == null)
                    lessonPageRepository = new LessonPageRepository(_context);
                return lessonPageRepository;
            }
        }

        public LessonResultRepository LessonResultRepository
        {
            get
            {
                if(lessonResultRepository == null)
                    lessonResultRepository = new LessonResultRepository(_context);
                return lessonResultRepository;
            }
        }

        public UnitOfWork_Test(TestContext testContext)
        {
            _context = testContext;
        }
    }
}
