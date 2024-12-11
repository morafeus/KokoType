using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.User.BLL.DTO
{
    public class RefreshDTO
    {
        public Guid Id { get; set; }
        public string RefreshToken { get; set; }
    }
}
