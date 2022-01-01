using AutoMapper;
using JsonPlaceApi.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace JsonPlace.Common
{
    public static class CommonDIModule
    {
        public static void Inject(IServiceCollection services, IConfiguration configuration,byte[] secretKey)
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddMvc();
            services.AddSingleton<IJWTAuthenticationManager>(new JWTAuthManager(secretKey));

        }
    }
}
