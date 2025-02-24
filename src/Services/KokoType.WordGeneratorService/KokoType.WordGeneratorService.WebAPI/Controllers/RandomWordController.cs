using KokoType.WordGeneratorService.Service.Service;
using Microsoft.AspNetCore.Mvc;

namespace KokoType.WordGeneratorService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RandomWordController : ControllerBase
    {
        private readonly IWordGeneratorService _wordGeneratorService;

        public RandomWordController(IWordGeneratorService wordGeneratorService)
        {
            _wordGeneratorService = wordGeneratorService;
        }

        [HttpGet("getRandom")]
        public async Task<IActionResult> GetWords(int count, string difficulty, string language)
        {
            if (count <= 0)
            {
                return BadRequest("Количество слов должно быть больше 0.");
            }

            List<string> words = new List<string>();
            switch (language)
            {
                case "Russian":
                    {
                        words = await _wordGeneratorService.GetRusWords(count, difficulty);
                        break;
                    }
                case "English":
                    {
                        words = await _wordGeneratorService.GetEngWords(count, difficulty);
                        break;
                    }
            }

            return Ok(words);
        }

    }
}
