using KokoType.User.DAL.Context;
using KokoType.User.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace KokoType.User.DAL.Configurations
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDAL(this IServiceCollection services)
        {

            services.AddDbContext<UserContext>(options =>
            {
                options.UseMySQL("Server=localhost;Database=KokoType_UserServiceDB;Uid=root;Pwd=1234;");
            });
            services.AddScoped<IUnitOfWork, UnitOfWork_User>();

            return services;
        }
    }
}
