using Grpc.Core;
using JsonPlace.Business.Abstract.Identity;
using JsonPlace.DataTransferObjects.User;
using JsonPlaceApi.Helpers;

namespace JsonPlaceApi.Services
{
    public class TokenService : TokenPrt.TokenPrtBase
    {
        private readonly IUserOperations _userOperations;
        public TokenService(IUserOperations userOperations, IJWTAuthenticationManager jwtAuthorizatinService)
        {
            _userOperations = userOperations;
        }

        public async override Task<RegisterResponse> Register(SimpleAccountDto dto, ServerCallContext context)
        {
            var temp = ToUserDto(dto);
            var operationResult = await _userOperations.Upsert(temp);
            return new RegisterResponse { AuthToken = operationResult.AuthToken, Result = operationResult.Result };
        }

        public async override Task<LoginResponse> Login(SimpleAccountDto dto, ServerCallContext context)
        {
            var temp = ToUserDto(dto);
            var operationResult = await _userOperations.Login(temp);
            return new LoginResponse { AuthToken = operationResult.AuthToken, Result = operationResult.Result };
        }

        public UserDto ToUserDto(SimpleAccountDto dto)
        {
            return new UserDto
            {
                Email = dto.Email,
                Password = dto.Password,
                Username = dto.Username
            };
        }

    }
}
