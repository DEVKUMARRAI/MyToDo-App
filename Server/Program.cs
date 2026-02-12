using Microsoft.EntityFrameworkCore;
using Server.Data;
using DotNetEnv;

Env.Load();

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");

builder.Services.AddDbContext
<MyTodoAppDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowReactApp", policy =>
    {
      policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
