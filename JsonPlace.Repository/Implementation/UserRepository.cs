using JsonPlace.Core.Entitites.Identity;
using JsonPlace.DataTransferObjects.User;
using JsonPlace.Repository.Abstract;
using MongoDB.Driver;

namespace JsonPlace.Repository.Implementation
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IServiceProvider serviceProvider) : base(serviceProvider) { }

        public async Task<User> GetUserByLoginInfoAsync(string username, string password)
        {
            var filter = Builders<User>.Filter.Eq(x => x.IsDeleted, false)
                            & Builders<User>.Filter.Eq(x => x.Password, password)
                            & (Builders<User>.Filter.Eq(x => x.Username, username));
            var query = await _collection.FindAsync(_clientSessionHandle, filter);
            return await query.FirstOrDefaultAsync();

        }
    }
}
