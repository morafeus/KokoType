using KokoType.Lesson.BLL.Interfaces;
using KokoType.Lesson.BLL.Service;
using Microsoft.Extensions.DependencyInjection;


namespace KokoType.Lesson.BLL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBLL(this IServiceCollection services)
        {
            services.AddScoped<ILessonService, LessonService>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
            });

            return services;
        }
    }
}
