using JsonPlace.Core.Entitites;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;

namespace JsonPlace.Repository.Helpers
{
    public static class BaseEntityHelper
    {
        public static T CreateDeepCopy<T>(this T obj) where T : BaseEntity
        {
            using (var ms = new MemoryStream())
            {
                IFormatter formatter = new BinaryFormatter();
                formatter.Serialize(ms, obj);
                ms.Seek(0, SeekOrigin.Begin);
                return (T)formatter.Deserialize(ms);
            }
        }
    }
}
