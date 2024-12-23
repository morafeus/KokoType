using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Tests.DAL.Models
{
    public class Statistic
    {
        public Guid Id { get; set; }
        public float Accuracy { get; set; }
        public float Speed { get; set; }
        public string Decription { get; set; }
        public string Errors { get; set; }

        public Guid UserId { get; set; }
    }
}
