using KokoType_DAL_Test.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_Test.Repositories
{
    public class StatisticRepository : BaseRepository<Statistic>
    {
        public StatisticRepository(DbContext context) : base(context) { }
    }
}
