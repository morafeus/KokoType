using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_User.Models
{
    public class Achivement
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public string Condition { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        
        public List<User> Users { get; set; }
    }
}
