using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Tests.BLL.DTO
{
    public class SaveResultDTO
    {
        public Guid UserId { get; set; }
        public float Accuracy { get; set; }
        public float Speed { get; set; }
        public string Decription { get; set; }
        public string Errors { get; set; }
    }
}
