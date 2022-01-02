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
            var resp = new AuthResponseDto();
            if (!user.ValidateForRegister())
                return resp;

            var userModel = _mapper.Map<User>(user);
            try
            {
                await _userRepository.InsertAsync(userModel);
                resp.Result = true;
                resp.AuthToken = _jWTManager.Authonticate(new JsonPlaceTokenIngreditians { Username = userModel.Username, UserId = userModel.Id });
            }
            catch
            {
                resp.Result = false;
            }

            return resp;
        }

        public async Task<AuthResponseDto> Login(UserDto dto)
        {
            var resp = new AuthResponseDto();
            if (!dto.ValidateForLogin())
                return resp;
            
            var user = await _userRepository.GetUserByLoginInfoAsync(dto.Username,dto.Password);
            if (user == null)
                return resp;
            resp.AuthToken = _jWTManager.Authonticate(new JsonPlaceTokenIngreditians { UserId=user.Id,Username=user.Username});
            resp.Result = true;
            return resp;
        }

    }
}
