using KokoType.TestService.BLL.Interfaces;
using Microsoft.Extensions.DependencyInjection;


namespace KokoType.TestService.BLL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBLL(this IServiceCollection services)
        {
            services.AddScoped<ITestService, KokoType.TestService.BLL.Service.TestService>();
            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
            });

            return services;
        }
    }
}
