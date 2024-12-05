using KokoType.User.BLL.Interfaces;
using KokoType.User.BLL.Service;
using Microsoft.Extensions.DependencyInjection;


namespace KokoType.User.BLL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBLL(this IServiceCollection services)
        {
            services.AddScoped<IHashService, HashService>();
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
