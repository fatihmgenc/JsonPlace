using AutoMapper;
using JsonPlace.Core.Entitites;
using JsonPlace.Core.Entitites.Identity;
using JsonPlace.Repository.Abstract;
using JsonPlace.Repository.Helpers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Linq.Expressions;
using System.Reflection;

namespace JsonPlace.Repository.Implementation
{
    public abstract class Repository<TSource> : IRepository<TSource> where TSource : BaseEntity, new()
    {
        protected readonly IClientSessionHandle _clientSessionHandle;
        private readonly IMongoCollection<TSource> _collection;
        protected readonly IMapper _mapper;
        protected readonly LoginUser _loginUser;

        public Repository(IServiceProvider serviceProvider)
        {
            _mapper = serviceProvider.GetService<IMapper>();
            var mongoClient = serviceProvider.GetService<IMongoClient>();
            _loginUser = serviceProvider.GetService<LoginUser>();
            _clientSessionHandle = serviceProvider.GetService<IClientSessionHandle>();
            var environment = serviceProvider.GetService<IHostEnvironment>();
            var dbName = environment.EnvironmentName + "-" + "jsonplace";
            var db = mongoClient.GetDatabase(dbName);
            _collection = db.GetCollection<TSource>(typeof(TSource).Name.ToLowerInvariant());

        }

        public TSource FillBaseEntity(TSource entity)
        {
            if (entity == null)
                return entity;

            if (string.IsNullOrWhiteSpace(entity.Id))
            {
                entity.Id = ObjectId.GenerateNewId().ToString();
                entity.CreatedAt = DateTime.Now;
            }
            entity.LastModifiedAt = DateTime.Now;

            return entity;
        }

        public IEnumerable<TSource> FillBaseEntities(IEnumerable<TSource> entities)
        {
            return entities?.Select(entity => FillBaseEntity(entity));
        }

        public List<WriteModel<TSource>> FillBaseEntities(List<WriteModel<TSource>> bulkOperations, bool hardDelete = false)
        {
            // soft delete update defination
            var isDeletedUpdateDefination = Builders<TSource>.Update.Set(x => x.IsDeleted, true)
                .Set(x => x.LastModifiedAt, DateTime.Now);

            for (int i = 0; i < bulkOperations.Count; i++)
            {
                var op = bulkOperations[i];

                switch (op.ModelType)
                {
                    case WriteModelType.InsertOne:
                        {
                            var entity = ((InsertOneModel<TSource>)op).Document.CreateDeepCopy();
                            FillBaseEntity(entity);
                            bulkOperations[i] = new InsertOneModel<TSource>(entity);
                        }
                        break;
                    case WriteModelType.DeleteOne:
                        {
                            var deleteOneOperation = (DeleteOneModel<TSource>)op;
                            var filter = deleteOneOperation.Filter;

                            if (hardDelete)
                                bulkOperations[i] = new DeleteOneModel<TSource>(filter)
                                {
                                    Collation = deleteOneOperation.Collation,
                                    Hint = deleteOneOperation.Hint
                                };
                            else
                                bulkOperations[i] = new UpdateOneModel<TSource>(filter, isDeletedUpdateDefination)
                                {
                                    Collation = deleteOneOperation.Collation,
                                    Hint = deleteOneOperation.Hint
                                };
                        }
                        break;
                    case WriteModelType.DeleteMany:
                        {
                            var deleteManyOperation = (DeleteManyModel<TSource>)op;
                            var filter = deleteManyOperation.Filter;

                            if (hardDelete)
                                bulkOperations[i] = new DeleteManyModel<TSource>(filter)
                                {
                                    Collation = deleteManyOperation.Collation,
                                    Hint = deleteManyOperation.Hint
                                };
                            else
                                bulkOperations[i] = new UpdateManyModel<TSource>(filter, isDeletedUpdateDefination)
                                {
                                    Collation = deleteManyOperation.Collation,
                                    Hint = deleteManyOperation.Hint
                                };
                        }
                        break;
                    case WriteModelType.ReplaceOne:
                        {
                            var replaceOneOperation = (ReplaceOneModel<TSource>)op;
                            var entity = replaceOneOperation.Replacement.CreateDeepCopy();
                            FillBaseEntity(entity);

                            var filter = replaceOneOperation.Filter;

                            bulkOperations[i] = new ReplaceOneModel<TSource>(filter, entity)
                            {
                                IsUpsert = replaceOneOperation.IsUpsert,
                                Hint = replaceOneOperation.Hint,
                                Collation = replaceOneOperation.Collation
                            };
                        }
                        break;
                    case WriteModelType.UpdateOne:
                        {
                            var updateOneOperation = (UpdateOneModel<TSource>)op;
                            var filter = updateOneOperation.Filter;

                            var update = updateOneOperation.Update
                                            .Set(x => x.LastModifiedAt, DateTime.Now)
                                            .SetOnInsert(x => x.CreatedAt, DateTime.Now);

                            bulkOperations[i] = new UpdateOneModel<TSource>(filter, update)
                            {
                                IsUpsert = updateOneOperation.IsUpsert,
                                Hint = updateOneOperation.Hint,
                                Collation = updateOneOperation.Collation
                            };
                        }
                        break;
                    case WriteModelType.UpdateMany:
                        {
                            var updateManyOperation = (UpdateManyModel<TSource>)op;
                            var filter = updateManyOperation.Filter;

                            var update = updateManyOperation.Update
                                            .Set(x => x.LastModifiedAt, DateTime.Now)
                                            .SetOnInsert(x => x.CreatedAt, DateTime.Now);

                            bulkOperations[i] = new UpdateManyModel<TSource>(filter, update)
                            {
                                IsUpsert = updateManyOperation.IsUpsert,
                                Hint = updateManyOperation.Hint,
                                Collation = updateManyOperation.Collation
                            };
                        }
                        break;
                    default:
                        break;
                }
            }

            return bulkOperations;
        }

        public IMongoQueryable<TDestination> ProjectTo<TDestination>(IMongoQueryable query)
        {
            return (IMongoQueryable<TDestination>)_mapper.ProjectTo<TDestination>(query);
        }

        public IMongoQueryable<TSource> GetAll() => GetAllWithDeleted().Where(x => !x.IsDeleted);
        public IMongoQueryable<TSource> GetAllWithDeleted() => _collection.AsQueryable(_clientSessionHandle);
        public IMongoQueryable<TDestination> GetAll<TDestination>(Expression<Func<TSource, TDestination>> @select) => GetAll().Select(@select);
        public IMongoQueryable<TDestination> GetAllWithDeleted<TDestination>(Expression<Func<TSource, TDestination>> @select) => GetAllWithDeleted().Select(@select);
        public IMongoQueryable<TDestination> GetAll<TDestination>() => ProjectTo<TDestination>(GetAll());
        public IMongoQueryable<TDestination> GetAllWithDeleted<TDestination>() => ProjectTo<TDestination>(GetAllWithDeleted());

        public IMongoQueryable<TSource> Where(Expression<Func<TSource, bool>> predicate) => GetAll().Where(predicate);
        public IMongoQueryable<TDestination> Where<TDestination>(Expression<Func<TSource, bool>> predicate, Expression<Func<TSource, TDestination>> select) => Where(predicate).Select(select);
        public IMongoQueryable<TDestination> Where<TDestination>(Expression<Func<TSource, bool>> predicate) => ProjectTo<TDestination>(Where(predicate));
        public IMongoQueryable<TSource> WhereWithDeleted(Expression<Func<TSource, bool>> predicate) => GetAllWithDeleted().Where(predicate);
        public IMongoQueryable<TDestination> WhereWithDeleted<TDestination>(Expression<Func<TSource, bool>> predicate, Expression<Func<TSource, TDestination>> select) => WhereWithDeleted(predicate).Select(select);
        public IMongoQueryable<TDestination> WhereWithDeleted<TDestination>(Expression<Func<TSource, bool>> predicate) => ProjectTo<TDestination>(WhereWithDeleted(predicate));

        public IMongoQueryable<TSource> GetById(string id) => Where(x => x.Id == id);
        public IMongoQueryable<TDestination> GetById<TDestination>(string id, Expression<Func<TSource, TDestination>> @select) => Where(x => x.Id == id, select);
        public IMongoQueryable<TDestination> GetById<TDestination>(string id) => Where<TDestination>(x => x.Id == id);
        public IMongoQueryable<TSource> GetByIdWithDeleted(string id) => WhereWithDeleted(x => x.Id == id);
        public IMongoQueryable<TDestination> GetByIdWithDeleted<TDestination>(string id, Expression<Func<TSource, TDestination>> @select) => WhereWithDeleted(x => x.Id == id, select);
        public IMongoQueryable<TDestination> GetByIdWithDeleted<TDestination>(string id) => WhereWithDeleted<TDestination>(x => x.Id == id);

        public Task<TSource> FirstOrDefaultAsync() => GetAll().FirstOrDefaultAsync();
        public Task<TDestination> FirstOrDefaultAsync<TDestination>(Expression<Func<TSource, TDestination>> @select) => GetAll(select).FirstOrDefaultAsync();
        public Task<TDestination> FirstOrDefaultAsync<TDestination>() => GetAll<TDestination>().FirstOrDefaultAsync();

        public Task InsertAsync(TSource entity) => _collection.InsertOneAsync(_clientSessionHandle, FillBaseEntity(entity));
        public Task InsertRangeAsync(IEnumerable<TSource> entities) => _collection.InsertManyAsync(_clientSessionHandle, FillBaseEntities(entities));

        public Task<ReplaceOneResult> UpsertAsync(TSource entity)
        {
            FillBaseEntity(entity);
            var filter = Builders<TSource>.Filter.Eq(x => x.Id, entity.Id);
            return _collection.ReplaceOneAsync(_clientSessionHandle, filter, entity, new ReplaceOptions
            {
                IsUpsert = true
            });
        }

        public Task<ReplaceOneResult> UpdateAsync(TSource entity)
        {
            var filter = Builders<TSource>.Filter.Eq(x => x.Id, entity.Id);
            return _collection.ReplaceOneAsync(_clientSessionHandle, filter, FillBaseEntity(entity));
        }

        public Task<BulkWriteResult<TSource>> UpdateRangeAsync(IEnumerable<TSource> entities)
        {
            var updateOperations = entities
                .Select(entity => new ReplaceOneModel<TSource>
                (
                     Builders<TSource>.Filter.Eq(x => x.Id, entity.Id),
                    entity
                )).ToList<WriteModel<TSource>>();

            return BulkWriteAsync(updateOperations);
        }

        public Task<UpdateResult> UpdateOnlyFields(TSource entity, params string[] names)
        {
            if (names == null || names.Length == 0)
                throw new Exception("Arguments required 'names' for 'UpdateOnlyFields'");

            FillBaseEntity(entity);
            names = names.Union(new[] { nameof(entity.LastModifiedAt) }).ToArray();

            var json = JsonConvert.SerializeObject(entity, new JsonSerializerSettings()
            {
                ContractResolver = new UpdateOnlyPropertiesResolver(names),
            });

            var bson = BsonDocument.Parse(json);
            var update = new BsonDocument("$set", bson);
            var filter = Builders<TSource>.Filter.Eq(x => x.Id, entity.Id);

            return _collection.UpdateOneAsync(_clientSessionHandle, filter, update);
        }

        public Task<UpdateResult> UpdateIncluded(string id, object included)
        {
            var bson = included.ToBsonDocument();
            var update = new BsonDocument("$set", bson);
            var filter = Builders<TSource>.Filter.Eq(x => x.Id, id);

            return _collection.UpdateOneAsync(_clientSessionHandle, filter, update);
        }

        public Task<UpdateResult> UpdateWithoutFields(TSource entity, params string[] names)
        {
            if (names == null || names.Length == 0)
                throw new Exception("Arguments required 'names' for 'UpdateWithoutFields'");

            FillBaseEntity(entity);
            names = names.Union(new[] { nameof(entity.CreatedAt) }).ToArray();

            var json = JsonConvert.SerializeObject(entity, new JsonSerializerSettings()
            {
                ContractResolver = new UpdateWithoutPropertiesResolver(names),
            });

            var bson = BsonDocument.Parse(json);
            var update = new BsonDocument("$set", bson);
            var filter = Builders<TSource>.Filter.Eq(x => x.Id, entity.Id);

            return _collection.UpdateOneAsync(_clientSessionHandle, filter, update);
        }

        public Task<UpdateResult> DeleteAsync(string id)
        {
            var updateDefinitions = new List<UpdateDefinition<TSource>>
            {
                Builders<TSource>.Update.Set(x => x.IsDeleted, true),
                Builders<TSource>.Update.Set(x => x.LastModifiedAt, DateTime.Now),
            };

            var update = Builders<TSource>.Update.Combine(updateDefinitions);
            var filter = Builders<TSource>.Filter.Eq(x => x.Id, id);
            return _collection.UpdateOneAsync(_clientSessionHandle, filter, update);
        }
        public Task<UpdateResult> DeleteAsync(Expression<Func<TSource, bool>> predicate)
        {
            var updateDefinitions = new List<UpdateDefinition<TSource>>
            {
                Builders<TSource>.Update.Set(x => x.IsDeleted, true),
                Builders<TSource>.Update.Set(x => x.LastModifiedAt, DateTime.Now),
            };

            var update = Builders<TSource>.Update.Combine(updateDefinitions);
            return _collection.UpdateManyAsync(_clientSessionHandle, predicate, update);
        }
        public Task<DeleteResult> HardDeleteAsync(string id) => _collection.DeleteOneAsync(_clientSessionHandle, Builders<TSource>.Filter.Eq(x => x.Id, id));
        public Task<DeleteResult> HardDeleteAsync(Expression<Func<TSource, bool>> predicate) => _collection.DeleteOneAsync(_clientSessionHandle, predicate);

        public BulkWriteResult<TSource> BulkWrite(List<WriteModel<TSource>> bulkOperations, bool hardDelete = false)
        {
            bulkOperations = FillBaseEntities(bulkOperations, hardDelete);
            return _collection.BulkWrite(_clientSessionHandle, bulkOperations, new BulkWriteOptions()
            {
                IsOrdered = true
            });
        }
        public Task<BulkWriteResult<TSource>> BulkWriteAsync(List<WriteModel<TSource>> bulkOperations, bool hardDelete = false)
        {
            bulkOperations = FillBaseEntities(bulkOperations, hardDelete);
            return _collection.BulkWriteAsync(_clientSessionHandle, bulkOperations, new BulkWriteOptions()
            {
                IsOrdered = true
            });
        }

        public long Count(Expression<Func<TSource, bool>> predicate = null)
        {
            var filter = Builders<TSource>.Filter.Where(x => !x.IsDeleted);
            filter = predicate != null ? predicate & filter : filter;

            return _collection.CountDocuments(_clientSessionHandle, filter);
        }
        public Task<long> CountAsync(Expression<Func<TSource, bool>> predicate = null)
        {
            var filter = Builders<TSource>.Filter.Where(x => !x.IsDeleted);
            filter = predicate != null ? predicate & filter : filter;

            return _collection.CountDocumentsAsync(_clientSessionHandle, filter);
        }
        public long CountWithDeleted(Expression<Func<TSource, bool>> predicate = null)
        {
            return _collection.CountDocuments(_clientSessionHandle, predicate);
        }
        public Task<long> CountWithDeletedAsync(Expression<Func<TSource, bool>> predicate = null)
        {
            return _collection.CountDocumentsAsync(_clientSessionHandle, predicate);
        }
        public bool Any(Expression<Func<TSource, bool>> predicate = null)
        {
            return predicate == null ? GetAll().Any() : Where(predicate).Any();
        }
        public Task<bool> AnyAsync(Expression<Func<TSource, bool>> predicate = null)
        {
            return predicate == null ? GetAll().AnyAsync() : Where(predicate).AnyAsync();
        }
        public bool AnyWithDeleted(Expression<Func<TSource, bool>> predicate = null)
        {
            return predicate == null ? GetAllWithDeleted().Any() : WhereWithDeleted(predicate).Any();
        }
        public Task<bool> AnyWithDeletedAsync(Expression<Func<TSource, bool>> predicate = null)
        {
            return predicate == null ? GetAllWithDeleted().AnyAsync() : WhereWithDeleted(predicate).AnyAsync();
        }
    }

    public class UpdateWithoutPropertiesResolver : DefaultContractResolver
    {
        private readonly HashSet<string> propNames;
        public UpdateWithoutPropertiesResolver(IEnumerable<string> withoutPropertie) => propNames = new HashSet<string>(withoutPropertie);

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            JsonProperty property = base.CreateProperty(member, memberSerialization);
            if (propNames.Contains(property.PropertyName))
            {
                property.ShouldSerialize = _ => false;
            }
            return property;
        }
    }

    public class UpdateOnlyPropertiesResolver : DefaultContractResolver
    {
        private readonly HashSet<string> propNames;
        public UpdateOnlyPropertiesResolver(IEnumerable<string> onlyPropertiesR) => propNames = new HashSet<string>(onlyPropertiesR);

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            JsonProperty property = base.CreateProperty(member, memberSerialization);
            if (!propNames.Contains(property.PropertyName))
            {
                property.ShouldSerialize = _ => false;
            }
            return property;
        }
    }


}
