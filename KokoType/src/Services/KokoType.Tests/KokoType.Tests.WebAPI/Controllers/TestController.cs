using KokoType.Tests.BLL.DTO;
using KokoType.Tests.BLL.Interfaces;
using KokoType.Tests.DAL.Models;
using Microsoft.AspNetCore.Authorization;
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
        
        [HttpPost]
        [Route("setResult")]
        [Authorize]
        public async Task<IActionResult> SetResultAcync([FromBody]SaveResultDTO saveResult)
        {
            try
            {
                Statistic results = await _testService.SetResult(saveResult);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("getStats")]
        [Authorize]
        public async Task<IActionResult> GetResultsAsync([FromBody]GetResultDTO getResult)
        {
            try
            {
                List<Statistic> statistics = await _testService.GetStatisticList(getResult);
                return Ok(statistics);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost]
        [Route("getBest")]
        [Authorize]
        public async Task<IActionResult> GetBestAsync([FromBody] GetStatsDTO getBest)
        {
            try
            {
                StatsModel statistics = await _testService.GetStatsById(getBest);
                return Ok(statistics);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
