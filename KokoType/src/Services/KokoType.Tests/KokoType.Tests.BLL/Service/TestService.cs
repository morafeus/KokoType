
using KokoType.Tests.BLL.Interfaces;
using KokoType.Tests.DAL.Models;

namespace KokoType.Tests.BLL.Service
{
    public class TestService : ITestService
    {
        static HttpClient httpClient = new HttpClient();

        public async Task<string> GetWordTest(TestParams testParams)
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, $"https://random-word-api.herokuapp.com/word?number={testParams.Limit}");
            using HttpResponseMessage response = await httpClient.SendAsync(request);
            string content = await response.Content.ReadAsStringAsync();

            return content;
        }
    }
}
