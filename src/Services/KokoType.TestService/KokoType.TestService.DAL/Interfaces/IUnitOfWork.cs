using KokoType.TestService.DAL.Repositories;


namespace KokoType.TestService.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        public StatisticRepository StatisticRepository { get; }
    }
}
