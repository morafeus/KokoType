using KokoType.Lesson.DAL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace KokoType.Lesson.DAL.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDAL(this IServiceCollection services)
        {
            services.AddDbContext<LessonContext>(options =>
            {
                options.UseMySQL("Server=localhost;Database=KokoType_LessonServiceDB;Uid=root;Pwd=1234;");
            });

            return services;
        }
    }
}
