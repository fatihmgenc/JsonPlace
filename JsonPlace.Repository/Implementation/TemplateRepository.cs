using JsonPlace.Core.Entitites.Template;
using JsonPlace.Repository.Abstract;

namespace JsonPlace.Repository.Implementation
{
    public class TemplateRepository : Repository<Template>, ITemplateRepository
    {
        public TemplateRepository(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }
    }
}
