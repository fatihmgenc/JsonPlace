using JsonPlace.Business.Abstract.Identity;
using JsonPlace.Core.Entitites.Identity;
using JsonPlace.Repository.Abstract;

namespace JsonPlace.Business.Implementation
{
    public class UserOperations : IUserOperations
    {
        private readonly IUserRepository _userRepository;

        public UserOperations(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<string> Upsert(User user)
        {
            await _userRepository.InsertAsync(user);
            return user.Id;
        }
    }
}
