using AutoMapper.QueryableExtensions;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.Common.Helpers
{
    public static class MongoDbExtensions
    {
        public static IMongoQueryable<TDestination> ProjectTo<TSource, TDestination>(this IQueryable<TSource> query, AutoMapper.IMapper autoMapper) =>
            query.ProjectTo<TDestination>(autoMapper.ConfigurationProvider) as IMongoQueryable<TDestination>;
    }
}
