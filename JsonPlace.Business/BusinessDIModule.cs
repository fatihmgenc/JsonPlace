using JsonPlace.Business.Abstract.Identity;
using JsonPlace.Business.Implementation;
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
        }
    }
}
