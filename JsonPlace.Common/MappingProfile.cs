using AutoMapper;
using JsonPlace.Core.Entitites.Identity;
using JsonPlace.DataTransferObjects.User;

namespace JsonPlace.Common
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}
