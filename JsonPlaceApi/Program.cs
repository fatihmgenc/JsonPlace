using JsonPlace.Business;
using JsonPlaceApi.Helpers;
using JsonPlaceApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddGrpc();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IClientSessionHandle>(s=>s.GetService<IMongoClient>().StartSession());
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("MongoDb");
    var mongoClientSettings = MongoClientSettings.FromConnectionString(connectionString);
    var jws = new JsonWriterSettings { Indent = true };

    mongoClientSettings.ClusterConfigurator = clusterBuilder =>
    {
        clusterBuilder.Subscribe<CommandStartedEvent>(e =>
        {
            Console.WriteLine(e.Command.ToJson(jws));
        });
    };

    return new MongoClient(mongoClientSettings);
});

BusinessDIModule.Inject(builder.Services, builder.Configuration);
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthentication();
app.UseAuthorization();
app.MapGrpcService<GreeterService>();
app.MapGrpcService<TokenService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
app.Run();
