using JsonPlace.Business.Abstract.Identity;
using JsonPlace.Business.Abstract.Template;
using JsonPlace.Business.Implementation;
using JsonPlace.Business.Implementation.TemplateCon;
using JsonPlace.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace JsonPlace.Business
{
    public static class BusinessDIModule
    {
        public static void Inject(IServiceCollection services, IConfiguration configuration)
        {
            RepositoryDIModule.Inject(services, configuration);
            // repositories
            services.AddTransient<IUserOperations, UserOperations>();
            services.AddTransient<ITemplateOperations, TemplateOperations>();
        }
    }
}
