using KokoType.User.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KokoType.User.DAL.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {

        private DbContext _context;
        public DbSet<T> _table { get; }

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
            return await _table.AsNoTracking().ToListAsync();
        }

        public async Task<T> GetById(Guid id)
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
