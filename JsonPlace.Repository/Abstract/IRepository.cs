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
        IMongoQueryable<TDestination> GetAll<TDestination>(Expression<Func<TSource, TDestination>> @select);
        IMongoQueryable<TDestination> GetAllWithDeleted<TDestination>(Expression<Func<TSource, TDestination>> @select);
        IMongoQueryable<TDestination> GetAll<TDestination>();
        IMongoQueryable<TDestination> GetAllWithDeleted<TDestination>();

        IMongoQueryable<TSource> Where(Expression<Func<TSource, bool>> predicate);
        IMongoQueryable<TDestination> Where<TDestination>(Expression<Func<TSource, bool>> predicate, Expression<Func<TSource, TDestination>> select);
        IMongoQueryable<TDestination> Where<TDestination>(Expression<Func<TSource, bool>> predicate);
        IMongoQueryable<TSource> WhereWithDeleted(Expression<Func<TSource, bool>> predicate);
        IMongoQueryable<TDestination> WhereWithDeleted<TDestination>(Expression<Func<TSource, bool>> predicate, Expression<Func<TSource, TDestination>> select);
        IMongoQueryable<TDestination> WhereWithDeleted<TDestination>(Expression<Func<TSource, bool>> predicate);

        IMongoQueryable<TSource> GetById(string id) => Where(x => x.Id == id);
        IMongoQueryable<TDestination> GetById<TDestination>(string id, Expression<Func<TSource, TDestination>> @select);
        IMongoQueryable<TDestination> GetById<TDestination>(string id);
        IMongoQueryable<TSource> GetByIdWithDeleted(string id);
        IMongoQueryable<TDestination> GetByIdWithDeleted<TDestination>(string id, Expression<Func<TSource, TDestination>> @select);
        IMongoQueryable<TDestination> GetByIdWithDeleted<TDestination>(string id);

        Task<TSource> FirstOrDefaultAsync() => GetAll().FirstOrDefaultAsync();
        Task<TDestination> FirstOrDefaultAsync<TDestination>(Expression<Func<TSource, TDestination>> @select);
        Task<TDestination> FirstOrDefaultAsync<TDestination>();

        Task InsertAsync(TSource entity);
        Task InsertRangeAsync(IEnumerable<TSource> entities);

        Task<ReplaceOneResult> UpsertAsync(TSource entity);
        Task<ReplaceOneResult> UpdateAsync(TSource entity);
        Task<BulkWriteResult<TSource>> UpdateRangeAsync(IEnumerable<TSource> entities);
        Task<UpdateResult> UpdateOnlyFields(TSource entity, params string[] names);
        Task<UpdateResult> UpdateIncluded(string id, object included);
        Task<UpdateResult> UpdateWithoutFields(TSource entity, params string[] names);

        Task<UpdateResult> DeleteAsync(string id);
        Task<UpdateResult> DeleteAsync(Expression<Func<TSource, bool>> predicate);
        Task<DeleteResult> HardDeleteAsync(string id);
        Task<DeleteResult> HardDeleteAsync(Expression<Func<TSource, bool>> predicate);

        BulkWriteResult<TSource> BulkWrite(List<WriteModel<TSource>> bulkOperations, bool hardDelete = false);
        Task<BulkWriteResult<TSource>> BulkWriteAsync(List<WriteModel<TSource>> bulkOperations, bool hardDelete = false);

        long Count(Expression<Func<TSource, bool>> predicate = null);
        Task<long> CountAsync(Expression<Func<TSource, bool>> predicate = null);
        long CountWithDeleted(Expression<Func<TSource, bool>> predicate = null);
        Task<long> CountWithDeletedAsync(Expression<Func<TSource, bool>> predicate = null);

        bool Any(Expression<Func<TSource, bool>> predicate = null);
        Task<bool> AnyAsync(Expression<Func<TSource, bool>> predicate = null);
        bool AnyWithDeleted(Expression<Func<TSource, bool>> predicate = null);
        Task<bool> AnyWithDeletedAsync(Expression<Func<TSource, bool>> predicate = null);
    }
}
