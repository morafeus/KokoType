using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_User.Models
{
    public class User // добавить xp
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string About { get; set; }
        public string ImageUrl { get; set; }   
        public DateTime RegistrateDate { get; set; }
        public int UserLvl { get; set; }
        public int UserExp { get; set; }
        public string RefreshToken { get; set; }

        public List<Role> Roles { get; set; }
        public List<Achivement> Achives { get; set; }
    }
}
