using KokoType.Tests.DAL.Models;

namespace KokoType.Tests.BLL.Interfaces
{
    public interface ITestService
    {
        public Task<string> GetWordTest(TestParams testParams);
    }
}
