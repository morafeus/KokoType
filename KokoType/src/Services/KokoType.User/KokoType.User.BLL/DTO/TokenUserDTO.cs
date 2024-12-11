using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.User.BLL.DTO
{
    public class TokenUserDTO
    { 
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public int UserLvl { get; set; }
        public int UserExp { get; set; }
        public string Role { get; set; }
    }
}
