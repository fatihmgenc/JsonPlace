using JsonPlace.Business;
using JsonPlace.Common;
using JsonPlace.Common.Helpers;
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
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=
// Add services to the container.


builder.Services.AddGrpc();
builder.Services.AddCors(o => o.AddPolicy("AllowAll", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding", "x-user-agent", "x-grpc-web",
            "user-agent", "Content-Type", "Authorization", "Accept", "keep-alive", "Access-Control-Allow-Origin", "token", "x-accept-response-streaming");
}));


builder.Services.AddHsts(options =>
{
    options.IncludeSubDomains = true;
    options.Preload = true;
    options.MaxAge = TimeSpan.FromDays(120);
    options.ExcludedHosts.Add("jsonplace.com");
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureEndpointDefaults(listenOptions =>
    {
        listenOptions.UseHttps("jsonplacecom.pfx", "jsonplace");
    });
});


//builder.WebHost.UseKestrel(options =>
//{

//    options.Listen(IPAddress.Any, 80);
//    options.Listen(IPAddress.Any, 443, listenOptions =>
//    {
//        listenOptions.UseHttps("jsonplacecom.pfx", "jsonplace");

//    });

//});


var key = Encoding.ASCII.GetBytes(builder.Configuration.GetValue<string>("Secret_Key"));

builder.Services.Configure<SMTPConfig>(builder.Configuration.GetSection("SMTPConfig"));

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
CommonDIModule.Inject(builder.Services, builder.Configuration, key);
var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseHsts();
app.UseHttpsRedirection();
app.UseRouting();
app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true });
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
//app.MapGrpcService<TokenService>().EnableGrpcWeb();
//app.MapGrpcService<TemplateService>().EnableGrpcWeb();
//app.MapGrpcService<UserService>().EnableGrpcWeb();
//app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
app.UseEndpoints(endpoints =>
{
    endpoints.MapGrpcService<TokenService>().RequireCors("AllowAll");
    endpoints.MapGrpcService<TemplateService>().RequireCors("AllowAll");
    endpoints.MapGrpcService<UserService>().RequireCors("AllowAll");
});
app.Run();
