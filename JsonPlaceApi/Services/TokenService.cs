using Grpc.Core;
using JsonPlace.Business.Abstract.Identity;
using JsonPlace.DataTransferObjects.Ticket;
using JsonPlace.DataTransferObjects.User;
using JsonPlaceApi.Helpers;

namespace JsonPlaceApi.Services
{
    public class TokenService : TokenPrt.TokenPrtBase
    {
        private readonly IUserOperations _userOperations;
        public TokenService(IUserOperations userOperations)
        {
            _userOperations = userOperations;
        }

        public async override Task<RegisterResponse> Register(SimpleAccountDto dto, ServerCallContext context)
        {
            var temp = ToUserDto(dto);
            var operationResult = await _userOperations.Upsert(temp);
            return new RegisterResponse { AuthToken = operationResult.AuthToken, Success = operationResult.Success, ErrorMessage = operationResult.ErrorMessage };
        }

        public async override Task<LoginResponse> Login(SimpleAccountDto dto, ServerCallContext context)
        {
            var temp = ToUserDto(dto);
            var operationResult = await _userOperations.Login(temp);
            return new LoginResponse { AuthToken = operationResult.AuthToken, Success = operationResult.Success, ErrorMessage = operationResult.ErrorMessage };
        }

        public async override Task<TicketResponseDto> Ticket(TicketProtoDto dto, ServerCallContext context)
        {
            var id = context?.GetHttpContext()?.User?.Claims?.Where(x => x.Type == "UserId").FirstOrDefault()?.Value;
            return null;
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
        public TicketDto ToDto(TicketProtoDto dto)
        {
            return new TicketDto
            {
                Title = dto.Title,
                Message = dto.Message,
            };
        }

    }
}
