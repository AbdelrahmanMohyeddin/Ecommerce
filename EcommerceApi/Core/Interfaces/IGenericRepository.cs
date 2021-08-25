using Core.Entities;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T: BaseEntity
    {
        Task<IReadOnlyList<T>> GetListAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> GetEntityWithSpec(ISpecification<T> Spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> Spec);
        Task<int> CountAsync(ISpecification<T> Spec);
    }
}
