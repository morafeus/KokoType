using KokoType.Tests.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Tests.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        public StatisticRepository StatisticRepository { get; }
    }
}
