
using KokoType.WordGeneratorService.Service.Service;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KokoType.WordGeneratorService.Service.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddGenerator(this IServiceCollection services, IConfiguration configuration)
        {
            string path = configuration["WordFilesPath"];

            // Регистрируем сервис с переданным путем
            services.AddScoped<IWordGeneratorService>(provider => new  KokoType.WordGeneratorService.Service.Service.WordGeneratorService(path));

            return services;
        }
    }
}
