using Grpc.Core;
using JsonPlace.Business.Abstract.Identity;

namespace JsonPlaceApi.Services
{
    public class TokenService : TokenPrt.TokenPrtBase
    {
        private readonly IUserOperations _userOperations;

        public TokenService(IUserOperations userOperations)
        {
            _userOperations = userOperations;
        }

        public async override Task<Response> Register(SimpleAccountDto dto, ServerCallContext context)
        {
            return new Response { Temp=$"{dto.Username},{dto.Password},{dto.Email}" };
        }


    }
}
