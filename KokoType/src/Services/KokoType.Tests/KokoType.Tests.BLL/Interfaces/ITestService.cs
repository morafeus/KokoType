using KokoType.Tests.BLL.DTO;
using KokoType.Tests.DAL.Models;

namespace KokoType.Tests.BLL.Interfaces
{
    public interface ITestService
    {
        public Task<string> GetWordTest(TestParams testParams);
        public Task<Statistic> SetResult(SaveResultDTO saveResult);
        public Task<List<Statistic>> GetStatisticList(GetResultDTO getResult);
        public Task<StatsModel> GetStatsById(GetStatsDTO getStatsDTO);
    }
}
