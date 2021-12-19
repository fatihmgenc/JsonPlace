using JsonPlace.Core.Entitites.Identity;
using JsonPlace.Repository.Abstract;

namespace JsonPlace.Repository.Implementation
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IServiceProvider serviceProvider) : base(serviceProvider) { }
    }
}
