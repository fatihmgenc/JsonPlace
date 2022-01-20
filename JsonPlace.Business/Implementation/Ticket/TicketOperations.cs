using AutoMapper;
using JsonPlace.Business.Abstract.Ticket;
using JsonPlace.Business.Implementation.Validation;
using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.Ticket;
using JsonPlace.Repository.Abstract;

namespace JsonPlace.Business.Implementation.Ticket
{
    public class TicketOperations : ITicketOperations
    {
        private ITicketRepository _ticketRepository;
        private IMapper _mapper;
        public TicketOperations(ITicketRepository ticketRepository, IMapper mapper)
        {
            _ticketRepository = ticketRepository;
            _mapper = mapper;
        }

        public async Task<ResponseDto> SaveTicket(TicketDto dto)
        {
            if (!dto.Validate())
                return new ResponseDto { ErrorMessage = "Invalid Ticket!", Success = false };
            try
            {
                var model = _mapper.Map<Core.Entitites.TicketCore.Ticket>(dto);
                await _ticketRepository.InsertAsync(model);
                return new ResponseDto { Success = true, ErrorMessage = "" };
            }
            catch(Exception ex)
            {
                return new ResponseDto() { Success = false, ErrorMessage = "Server error while ticket!" };
            }
        }
    }
}
