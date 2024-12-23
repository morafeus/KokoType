
using KokoType.Tests.BLL.DTO;
using KokoType.Tests.BLL.Interfaces;
using KokoType.Tests.DAL.Interfaces;
using KokoType.Tests.DAL.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace KokoType.Tests.BLL.Service
{
    public class TestService : ITestService
    {
        private IUnitOfWork _unitOfWork;

        static HttpClient httpClient = new HttpClient();

        public TestService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<string> GetWordTest(TestParams testParams)
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, $"https://random-word-api.vercel.app/api?words={testParams.Limit}");
            using HttpResponseMessage response = await httpClient.SendAsync(request);
            string content = await response.Content.ReadAsStringAsync();

            return content;
        }

        public async Task<Statistic> SetResult(SaveResultDTO saveResult)
        {
            try
            {
                Statistic newStat = new Statistic()
                {
                    Id = Guid.NewGuid(),
                    Accuracy = saveResult.Accuracy,
                    Speed = saveResult.Speed,
                    Decription = saveResult.Decription,
                    Errors = saveResult.Errors,
                    UserId = saveResult.UserId,
                };
                await _unitOfWork.StatisticRepository.Add(newStat);
                return newStat;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Statistic>> GetStatisticList(GetResultDTO getResult)
        {
            try
            {
                List<Statistic> stats = await _unitOfWork.StatisticRepository.GetByUser(getResult.Id, getResult.Decription);
                return stats;
            }
            catch( Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<StatsModel> GetStatsById(GetStatsDTO getStats)
        {
            try
            {
                StatsModel stats = await _unitOfWork.StatisticRepository.GetBestStats(getStats.Id);
                return stats;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
