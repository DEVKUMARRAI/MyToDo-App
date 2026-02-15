using Microsoft.EntityFrameworkCore;
using Server.Data;
using DotNetEnv;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Configure port for Railway
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Get connection string (Railway uses ConnectionStrings__DefaultConnection)
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
                       ?? Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");

builder.Services.AddDbContext
<MyTodoAppDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowReactApp", policy =>
    {
      policy.WithOrigins(
          "http://localhost:5173",
          "http://localhost:3000",
          "https://my-to-do-app-eta-kohl.vercel.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
