using KokoType.TestService.DAL.Interfaces;
using KokoType.TestService.DAL.Repositories;


namespace KokoType.TestService.DAL.Context
{
    public class UnitOfWork_TestService : IUnitOfWork
    {
        private StatisticRepository statisticRepository;

        private TestContext _context { get; set; }

        public StatisticRepository StatisticRepository
        {
            get
            {
                if (statisticRepository == null)
                    statisticRepository = new StatisticRepository(_context);
                return statisticRepository;
            }
        }


        public UnitOfWork_TestService(TestContext testContext)
        {
            _context = testContext;
        }
    }
}
