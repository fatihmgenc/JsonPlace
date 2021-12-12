using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.Core.Entitites
{
    public abstract class BaseEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId]
        [BsonElement(Order = 0)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        [BsonElement(Order = 1001)]
        public DateTime CreatedAt { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        [BsonElement(Order = 1002)]
        public DateTime LastModifiedAt { get; set; }

        [BsonElement(Order = 1003)]
        public long? CreatedBy { get; set; }

        [BsonElement(Order = 1004)]
        public long? LastModifiedBy { get; set; }

        [BsonElement(Order = 1005)]
        [BsonRepresentation(BsonType.Boolean)]
        public bool IsDeleted { get; set; }

    }
}
