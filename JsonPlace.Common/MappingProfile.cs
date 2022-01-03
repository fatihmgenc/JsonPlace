using AutoMapper;
using JsonPlace.Core.Entitites.Identity;
using JsonPlace.Core.Entitites.Template;
using JsonPlace.DataTransferObjects.Template;
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
            CreateMap<TemplateDto, Template>();
            CreateMap<Template, TemplateDto>();
            CreateMap<PropType, PropTypeDto>();
            CreateMap<PropTypeDto, PropType>();
        }
    }
}
