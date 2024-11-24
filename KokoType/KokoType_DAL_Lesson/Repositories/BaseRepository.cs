using KokoType_DAL_Lesson.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace KokoType_DAL_Lesson.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {

        private DbContext _context;
        private DbSet<T> _table;

        public BaseRepository(DbContext context)
        {
            _context = context;
            _table = this._context.Set<T>();
        }

        public async Task Add(T entity)
        {
            await _table.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(T entity)
        {
            _table.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _table.AsNoTracking().ToListAsync<T>();
        }

        public async Task<T> GetById(int id)
        {
            var item = await _table.FindAsync(id);
            if (item == null)
                throw new Exception("Element not found");
            return item;
        }

        public async Task Update(T entity)
        {
            _table.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
