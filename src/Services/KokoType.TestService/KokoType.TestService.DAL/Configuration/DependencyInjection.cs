using KokoType.TestService.DAL.Context;
using KokoType.TestService.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace KokoType.TestService.DAL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDAL(this IServiceCollection services)
        {
            services.AddDbContext<TestContext>(options =>
            {
                options.UseSqlServer("Server=localhost,1433;Database=KokoType_TestServiceDB;User Id=sa;Password=Password1234;TrustServerCertificate=True;");
                //options.UseSqlServer("Server=KokoType.SqlServer,1433;Database=KokoType_TestServiceDB;User Id=sa;Password=Password1234;TrustServerCertificate=True;");
            });

            services.AddScoped<IUnitOfWork, UnitOfWork_TestService>();

            return services;
        }
    }
}
