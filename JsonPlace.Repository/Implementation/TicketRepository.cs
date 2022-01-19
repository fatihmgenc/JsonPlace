using JsonPlace.Core.Entitites.TicketCore;

namespace JsonPlace.Repository.Implementation
{
    public class TicketRepository : Repository<Ticket>
    {
        public TicketRepository(IServiceProvider serviceProvider) : base (serviceProvider) { }
    }
}
