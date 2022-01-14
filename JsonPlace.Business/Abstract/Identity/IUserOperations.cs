using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.User;

namespace JsonPlace.Business.Abstract.Identity
{
    public interface IUserOperations
    {
        public Task<AuthResponseDto> Upsert(UserDto user);
        public Task<AuthResponseDto> Login(UserDto dto);
        public bool RemindPassword(string mailAddress);
    }
}
