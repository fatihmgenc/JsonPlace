using JsonPlace.Core.Entitites.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.Business.Abstract.Identity
{
    public interface IUserOperations
    {
        public Task<string> Upsert(User user);
    }
}
