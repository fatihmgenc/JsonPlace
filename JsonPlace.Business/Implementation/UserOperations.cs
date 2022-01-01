using AutoMapper;
using JsonPlace.Business.Abstract.Identity;
using JsonPlace.Business.Implementation.Validation;
using JsonPlace.Core.Entitites.Identity;
using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.User;
using JsonPlace.Repository.Abstract;
using JsonPlaceApi.Helpers;

namespace JsonPlace.Business.Implementation
{
    public class UserOperations : IUserOperations
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJWTAuthenticationManager _jWTManager;
        public UserOperations(IUserRepository userRepository, IMapper mapper, IJWTAuthenticationManager jWTManager)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jWTManager = jWTManager;
        }


        public async Task<AuthResponseDto> Upsert(UserDto user)
        {
            if(!user.Validate())
                return null;
            var userModel = _mapper.Map<User>(user);
            var resp = new AuthResponseDto();
            try
            {
                await _userRepository.InsertAsync(userModel);
                resp.Result = true;
                resp.AuthToken = _jWTManager.Authonticate(user.Username);
            }
            catch
            {
                resp.Result = false;
            }

            return resp;
        }
    }
}
