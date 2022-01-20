using JsonPlace.Core.Entitites.TicketCore;
using JsonPlace.Repository.Abstract;

namespace JsonPlace.Repository.Implementation
{
    public class TicketRepository : Repository<Ticket>,ITicketRepository
    {
        public TicketRepository(IServiceProvider serviceProvider) : base (serviceProvider) { }
    }
}
