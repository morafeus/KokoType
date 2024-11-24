using KokoType_DAL_Test.Interfaces;
using KokoType_DAL_Test.Repositories;


namespace KokoType_DAL_Test.Context
{
    public class UnitOfWork_Test : IUnitOfWork
    {
        private StatisticRepository statisticRepository;

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

   

        public UnitOfWork_Test(TestContext testContext)
        {
            _context = testContext;
        }
    }
}
