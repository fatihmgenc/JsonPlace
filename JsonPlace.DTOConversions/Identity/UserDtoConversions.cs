using JsonPlace.Core.Entitites.Identity;
using JsonPlace.DataTransferObjects.User;

namespace JsonPlace.DTOConversions.Identity
{
    public static class UserDtoConversions
    {
        public static UserDto ToDto(this User user)
        {
            return new UserDto
            {
                Email = user.Email,
                Password=user.Password,
                Username=user.Username,
            };
        }

        public static User ToModel(this UserDto user)
        {
            return new User
            {
                Email = user.Email,
                Password = user.Password,
                Username = user.Username,
            };
        }
    }
}
