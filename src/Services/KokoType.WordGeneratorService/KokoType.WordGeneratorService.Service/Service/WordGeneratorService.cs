using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.WordGeneratorService.Service.Service
{
    public class WordGeneratorService : IWordGeneratorService
    {
        private readonly string _basePath;

        public WordGeneratorService(string basePath)
        {
            _basePath = basePath;
        }

        public async Task<List<string>> GetRusWords(int count, string difficulty)
        {
            return await GetWordsAsync("russian", difficulty, count);
        }

        public async Task<List<string>> GetEngWords(int count, string difficulty)
        {
            return await GetWordsAsync("english", difficulty, count);
        }

        private async Task<List<string>> GetWordsAsync(string language, string difficulty, int count)
        {

            string filePath = Path.Combine(Directory.GetCurrentDirectory(),"..", "KokoType.WordGeneratorService.Service", "Files", $"{language}-{difficulty}.txt");

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"File not found: {filePath}");
            }

            var words = await File.ReadAllLinesAsync(filePath);
            var randomWords = words.OrderBy(x => Guid.NewGuid()).Take(count).ToList();
            return randomWords;
        }
    }
}
