using KokoType.TestService.BLL.DTO;
using KokoType.TestService.DAL.Models;
using KokoType.TestService.DAL.ViewModels;

namespace KokoType.TestService.BLL.Interfaces
{
    public interface ITestService
    {
        public Task<string> GetWordTest(TestParams testParams);
        public Task<Statistic> SetResult(SaveResultDTO saveResult);
        public Task<List<Statistic>> GetStatisticList(GetResultDTO getResult);
        public Task<List<Statistic>> GetStatisticList(GetStatsDTO getResult);
        public Task<StatsModel> GetStatsById(GetStatsDTO getStatsDTO);
        public Task<List<Statistic>> GetAll();
        public Task<List<Statistic>> GetToday();
        public Task<List<Statistic>> GetClassic();
    }
}
