using KokoType.Tests.BLL.Interfaces;
using KokoType.Tests.DAL.Models;
using Microsoft.AspNetCore.Mvc;


namespace KokoType.Tests.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpPost]
        [Route("getTest")]
        public async Task<IActionResult> GetTestAcync([FromBody]TestParams testParams)
        {
            try
            {
                string test = await _testService.GetWordTest(testParams);
                return Ok(test);
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
           
        }
    }
}
