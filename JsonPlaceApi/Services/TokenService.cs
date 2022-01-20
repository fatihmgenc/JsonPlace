using Grpc.Core;
using JsonPlace.Business.Abstract.Identity;
using JsonPlace.Business.Abstract.Ticket;
using JsonPlace.DataTransferObjects.Ticket;
using JsonPlace.DataTransferObjects.User;
using JsonPlaceApi.Helpers;

namespace JsonPlaceApi.Services
{
    public class TokenService : TokenPrt.TokenPrtBase
    {
        private readonly IUserOperations _userOperations;
        private readonly ITicketOperations _ticketOperations;
        public TokenService(IUserOperations userOperations, ITicketOperations ticketOperations)
        {
            _userOperations = userOperations;
            _ticketOperations = ticketOperations;
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
            var tdto = ToDto(dto);
            if (id != null)
                tdto.UserId = id;
            var resp = await _ticketOperations.SaveTicket(tdto);
            return new TicketResponseDto { ErrorMessage = resp.ErrorMessage, Success = resp.Success };
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
