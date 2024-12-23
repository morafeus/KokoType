using KokoType.Tests.DAL.Context;
using KokoType.Tests.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace KokoType.Tests.DAL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDAL(this IServiceCollection services)
        {
             services.AddDbContext<TestContext>(options =>
             {
                 options.UseMySQL("Server=localhost;Database=KokoType_TestServiceDB;Uid=root;Pwd=1234;");
             });

            services.AddScoped<IUnitOfWork, UnitOfWork_Test>();

            return services;
        }
    }
}
