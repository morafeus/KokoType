using KokoType.LessonService.DAL.Context;
using KokoType.LessonService.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KokoType.LessonService.DAL.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        protected IDbContextFactory<LessonContext> _contextFactory;

        public BaseRepository(IDbContextFactory<LessonContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task Add(T entity)
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                context.Set<T>().Add(entity);
                await context.SaveChangesAsync();
            }
        }

        public async Task Delete(T entity)
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                context.Set<T>().Remove(entity);
                await context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                return await context.Set<T>().AsNoTracking().ToListAsync();
            }
        }

        public async Task<T> GetById(Guid id)
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                var item = await context.Set<T>().FindAsync(id);
                if (item == null)
                    throw new Exception("Element not found");
                return item;
            }
        }

        public async Task Update(T entity)
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                context.Set<T>().Update(entity);
                await context.SaveChangesAsync();
            }
        }
    }
}