using JsonPlace.Repository.Abstract;
using JsonPlace.Repository.Implementation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace JsonPlace.Repository
{
    public static class RepositoryDIModule
    {
        public static void Inject(IServiceCollection services, IConfiguration configuration)
        {
            // repositories
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ITemplateRepository, TemplateRepository>();
        }
    }
}