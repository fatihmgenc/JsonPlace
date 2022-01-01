using JsonPlace.Business;
using JsonPlace.Common;
using JsonPlaceApi.Helpers;
using JsonPlaceApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddGrpc();
var key = Encoding.ASCII.GetBytes("Developmet_Secret_Key_Happy_New_Year");
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IClientSessionHandle>(s => s.GetService<IMongoClient>().StartSession());
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
CommonDIModule.Inject(builder.Services,builder.Configuration,key);
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseAuthentication();
app.UseAuthorization();
app.MapGrpcService<GreeterService>();
app.MapGrpcService<TokenService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
app.Run();
