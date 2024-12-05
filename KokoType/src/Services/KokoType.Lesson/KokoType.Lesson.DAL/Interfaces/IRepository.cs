using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType.Lesson.DAL.Interfaces
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
