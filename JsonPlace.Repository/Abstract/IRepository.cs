using JsonPlace.Core.Entitites;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.Repository.Abstract
{
    public interface IRepository<TSource> where TSource : BaseEntity, new()
    {

        IMongoQueryable<TSource> GetAll();
        IMongoQueryable<TSource> GetAllWithDeleted();
        IMongoQueryable<TSource> Where(Expression<Func<TSource, bool>> predicate);

        Task InsertAsync(TSource entity);
        Task InsertRangeAsync(IEnumerable<TSource> entities);

        Task<ReplaceOneResult> UpsertAsync(TSource entity);
        Task<ReplaceOneResult> UpdateAsync(TSource entity);
        Task<BulkWriteResult<TSource>> UpdateRangeAsync(IEnumerable<TSource> entities);

        Task<UpdateResult> DeleteAsync(string id);
        Task<UpdateResult> DeleteAsync(Expression<Func<TSource, bool>> predicate);

        Task<BulkWriteResult<TSource>> BulkWriteAsync(List<WriteModel<TSource>> bulkOperations, bool hardDelete = false);
    }
}
