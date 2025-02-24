using KokoType.UserService.DAL.Repositories;

namespace KokoType.UserService.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        public UserRepository UserRepository { get; }

        public RoleRepository RoleRepository { get; }

        public AchivementRepository AchivementRepository { get; }
    }
}
