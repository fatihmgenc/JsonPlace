using Grpc.Core;
using JsonPlace.Business.Abstract.Identity;

namespace JsonPlaceApi.Services
{
    public class GreeterService : Greeter.GreeterBase
    {
        private readonly ILogger<GreeterService> _logger;
        private readonly IUserOperations _userOperations;
        public GreeterService(ILogger<GreeterService> logger, IUserOperations userOperations)
        {
            _logger = logger;
            _userOperations = userOperations;
        }

        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            return Task.FromResult(new HelloReply
            {
                Message = "Hello " + request.Name
            });
        }
        public async override Task<HelloReply> SayHelloButReverse(HelloRequest request, ServerCallContext context)
        {
            var result = await  _userOperations.Upsert(new JsonPlace.Core.Entitites.Identity.User { Email = "xxxxxx" });
            return new HelloReply
            {
                Message = request.Name + "Hello (Reverse) " + result
            };
        }
    }
}