using KokoType.LessonService.DAL.Context;
using KokoType.LessonService.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace KokoType.LessonService.DAL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDAL(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork_Lesson>();

            services.AddDbContext<LessonContext>(options =>
            {
                options.UseSqlServer("Server=localhost,1433;Database=KokoType_LessonServiceDB;User Id=sa;Password=Password1234;TrustServerCertificate=True;");
            });

            services.AddDbContextFactory<LessonContext>(options =>
            {
                options.UseSqlServer("Server=localhost,1433;Database=KokoType_LessonServiceDB;User Id=sa;Password=Password1234;TrustServerCertificate=True;");
            }, ServiceLifetime.Scoped);

            return services;
        }
    }
}
