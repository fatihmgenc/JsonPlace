using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.Ticket;

namespace JsonPlace.Business.Abstract.Ticket
{
    public interface ITicketOperations
    {
        public Task<ResponseDto> SaveTicket(TicketDto dto); 
    }
}
