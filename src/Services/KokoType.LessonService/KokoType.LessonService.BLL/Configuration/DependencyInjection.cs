using KokoType.LessonService.BLL.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace KokoType.LessonService.BLL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBLL(this IServiceCollection services)
        {
            services.AddScoped<ILessonService, LessonService.BLL.Service.LessonService>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
            });

            return services;
        }
    }
}
