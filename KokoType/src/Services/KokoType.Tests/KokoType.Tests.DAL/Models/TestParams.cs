using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Tests.DAL.Models
{
    public class TestParams
    {
        public List<string> Options { get; set; }
        public string TextType { get; set; }
        public string Limit { get; set; }
        public string Language { get; set; }
        public string Difficulty { get; set; }

        public TestParams()
        {

        }
    }
}
