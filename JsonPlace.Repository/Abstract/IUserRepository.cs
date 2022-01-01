using JsonPlace.Core.Entitites.Identity;

namespace JsonPlace.Repository.Abstract
{
    public interface IUserRepository : IRepository<User>
    {
        public Task<User> GetUserByLoginInfoAsync(string username, string password);
    }
}
