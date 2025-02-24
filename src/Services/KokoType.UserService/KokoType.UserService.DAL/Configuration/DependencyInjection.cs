using KokoType.UserService.DAL.Context;
using KokoType.UserService.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace KokoType.UserService.DAL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDAL(this IServiceCollection services)
        {

            services.AddDbContext<UserContext>(options =>
            {
                options.UseSqlServer("Server=localhost,1433;Database=KokoType_UserServiceDB;User Id=sa;Password=Password1234;TrustServerCertificate=True;");
                //options.UseSqlServer("Server=KokoType.SqlServer,1433;Database=KokoType_UserServiceDB;User Id=sa;Password=Password1234;TrustServerCertificate=True;");
            });
            services.AddScoped<IUnitOfWork, UnitOfWork_UserService>();

            return services;
        }
    }
}
