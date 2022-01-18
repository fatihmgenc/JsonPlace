using AutoMapper;
using Grpc.Core;
using JsonPlace.Business.Abstract.Identity;

namespace JsonPlaceApi.Services
{
    public class UserService : UserPrt.UserPrtBase
    {
        IMapper _mapper;
        IUserOperations _userOperations;
        public UserService(IMapper mapper, IUserOperations userOperations)
        {
            _mapper = mapper;
            _userOperations = userOperations;
        }

        public async override Task<RemindPasswordResponse> RemindPassword(RemindPasswordDto protoDto, ServerCallContext context)
        {
            var result = await _userOperations.RemindPassword(protoDto.MailAddress);
            return new RemindPasswordResponse { Success = result.Success, ErrorMessage = result.ErrorMessage };
        }
    }
}
