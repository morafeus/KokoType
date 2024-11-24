using KokoType_DAL_User.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_User.Context
{
    public class UnitOfWork_User
    {
        private UserRepository userRepository;
        private RoleRepository roleRepository;
        private AchivementRepository achivementRepository;

        public UserRepository UserRepository
        {
            get
            {
                if(userRepository == null)
                    userRepository = new UserRepository(_context);
                return userRepository;
            }
        }

        public RoleRepository RoleRepository
        {
            get
            {
                if(roleRepository == null)
                    roleRepository = new RoleRepository(_context);
                return roleRepository;
            }
        }

        public AchivementRepository AchivementRepository
        {
            get
            {
                if(achivementRepository == null)
                    achivementRepository = new AchivementRepository(_context);
                return achivementRepository;
            }
        }

        private UserContext _context {  get; set; }



        public UnitOfWork_User(UserContext context) 
        {
            _context = context;
        }


    }
}
