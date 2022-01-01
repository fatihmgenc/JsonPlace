using Grpc.Core;
using JsonPlace.Business.Abstract.Identity;
using JsonPlaceApi.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace JsonPlaceApi.Services
{
    public class TokenService : TokenPrt.TokenPrtBase
    {
        private readonly IUserOperations _userOperations;
        private readonly IJWTAuthenticationManager _jwtAuthorizatinService;
        public TokenService(IUserOperations userOperations, IJWTAuthenticationManager jwtAuthorizatinService)
        {
            _userOperations = userOperations;
            _jwtAuthorizatinService = jwtAuthorizatinService;
        }

        public async override Task<Response> Register(SimpleAccountDto dto, ServerCallContext context)
        {
            var token = _jwtAuthorizatinService.Authonticate(dto.Username, dto.Password);
            return new Response { Temp=$"{dto.Username},{dto.Password},{dto.Email}" };
            
        }



    }
}
