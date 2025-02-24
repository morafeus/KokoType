

namespace KokoType.WordGeneratorService.Service.Service
{
    public interface IWordGeneratorService
    {
        public Task<List<string>> GetRusWords(int count, string difficulty);
        public Task<List<string>> GetEngWords(int count, string difficulty);
    }
}
