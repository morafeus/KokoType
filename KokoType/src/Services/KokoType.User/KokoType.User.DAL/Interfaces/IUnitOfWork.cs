using KokoType.User.DAL.Repositories;

namespace KokoType.User.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        public UserRepository UserRepository { get;  }

        public RoleRepository RoleRepository { get;}

        public AchivementRepository AchivementRepository { get;}
    }
}
