

namespace KokoType_DAL_Test.Interfaces
{
    public interface IRepository<T> where T : class
    {
        public Task<T> GetById(int id);
        public Task<IEnumerable<T>> GetAll();

        public Task Add(T entity);
        public Task Update(T entity);
        public Task Delete(T entity);
    }
}
