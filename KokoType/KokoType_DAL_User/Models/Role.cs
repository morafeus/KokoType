using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_User.Models
{
    public class Role
    {
        public Guid Id { get; set; }
        public string RoleName { get; set; }

        public List<User> Users { get; set; }
    }
}
