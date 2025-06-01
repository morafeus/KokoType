using AutoMapper;
using KokoType.TestService.BLL.DTO;
using KokoType.TestService.BLL.Interfaces;
using KokoType.TestService.DAL.Interfaces;
using KokoType.TestService.DAL.Models;
using KokoType.TestService.DAL.ViewModels;
using Newtonsoft.Json;

namespace KokoType.TestService.BLL.Service
{
    public class TestService : ITestService
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        static HttpClient httpClient = new HttpClient();

        public TestService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<string> GetWordTest(TestParams testParams)
        {
            // Список для хранения всех полученных слов
            var allWords = new List<string>();
            var random = new Random();

            if (testParams.TextType == "text")
            {
                string textApiUrl = "https://baconipsum.com/api/?type=all-meat&paras=1&format=text"; // URL Lorem Ipsum API
                using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, textApiUrl))
                using (HttpResponseMessage response = await httpClient.SendAsync(request))
                {
                    string content = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(content))
                    {
                        allWords.Add(content); // Добавляем полученный текст в список
                    }
                }
            }
            else
            {

                // Определяем уровень сложности для API
                string difficulty = testParams.Difficulty switch
                {
                    "easy" => "short",
                    "medium" => "medium",
                    "hard" => "long",
                    _ => throw new ArgumentException("Unknown difficulty")
                };

                // Формируем URL для API с учетом count
                string apiUrl = $"http://localhost:5079/api/RandomWord/getRandom?count={testParams.Limit}&difficulty={difficulty}&language={testParams.Language}";

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, apiUrl);
                using (HttpResponseMessage response = await httpClient.SendAsync(request))
                {
                    string content = await response.Content.ReadAsStringAsync();

                    // Парсим и добавляем слова из ответа
                    if (!string.IsNullOrEmpty(content))
                    {
                        allWords = JsonConvert.DeserializeObject<List<string>>(content);

                        // Модифицируем слова по параметрам
                        for (int i = 0; i < allWords.Count; i++)
                        {
                            string word = allWords[i];

                            // Проверяем, если в Options есть "punctuation"
                            if (testParams.Options.Contains("punctuation"))
                            {
                                // 1. Рандомно делаем первую букву заглавной
                                if (random.Next(0, 2) == 0) // 50% шанс
                                {
                                    word = char.ToUpper(word[0]) + word.Substring(1);
                                }

                                // 2. Добавляем пунктуацию в конец слова (точка или запятая)
                                if (random.Next(0, 2) == 0) // 50% шанс
                                {
                                    word += random.Next(0, 2) == 0 ? "." : ","; // точка или запятая
                                }
                            }

                            // Проверяем, если в Options есть "numbers"
                            if (testParams.Options.Contains("numbers"))
                            {
                                // 30% шанс заменить слово на число
                                if (random.NextDouble() <= 0.3)
                                {
                                    // Генерация случайного числа той же длины, что и слово
                                    string numberString = GenerateRandomNumberString(word.Length);
                                    word = numberString; // Заменяем слово на число
                                }
                            }

                            // Обновляем слово в списке
                            allWords[i] = word;
                        }
                    }
                }
            }

            return string.Join(" ", allWords);

        }

        // Метод для генерации случайного числа, длина которого равна заданной
        private string GenerateRandomNumberString(int length)
        {
            var random = new Random();
            string result = "";
            for (int i = 0; i < length; i++)
            {
                result += random.Next(0, 10); // Добавляем случайную цифру от 0 до 9
            }
            return result;
        }



        public async Task<Statistic> SetResult(SaveResultDTO saveResult)
        {
            try
            {
                Statistic newStat = _mapper.Map<Statistic>(saveResult);
                await _unitOfWork.StatisticRepository.Add(newStat);


                List<Statistic> stats = await _unitOfWork.StatisticRepository.GetByUser(saveResult.UserId);
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
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Statistic>> GetStatisticList(GetStatsDTO getStats)
        {
            try
            {
                List<Statistic> stats = await _unitOfWork.StatisticRepository.GetByUser(getStats.Id);
                return stats;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<List<Statistic>> GetAll()
        {
            try
            {
                var stats = await _unitOfWork.StatisticRepository.GetAll();
                return stats.ToList<Statistic>();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<List<Statistic>> GetToday()
        {
            try
            {
                var stats = await _unitOfWork.StatisticRepository.GetByDateToday();
                return stats.ToList<Statistic>();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<List<Statistic>> GetClassic()
        {
            try
            {
                var stats = await _unitOfWork.StatisticRepository.GetClassic();
                return stats.ToList<Statistic>();
            }
            catch (Exception ex)
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
