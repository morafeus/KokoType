using KokoType.UserService.BLL.Interfaces;
using KokoType.UserService.BLL.Service;
using Microsoft.Extensions.DependencyInjection;


namespace KokoType.UserService.BLL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBLL(this IServiceCollection services)
        {
            services.AddScoped<IHashService, HashService>();
            services.AddScoped<IUserService, KokoType.UserService.BLL.Service.UserService>();
            services.AddSingleton<ITokenService, TokenService>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
            });

            return services;
        }
    }
}
