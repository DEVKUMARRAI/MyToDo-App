using Microsoft.EntityFrameworkCore;
using Server.Data;
using DotNetEnv;

Env.Load();

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");

builder.Services.AddDbContext<MyTodoAppDbContext>(options =>
    options.UseNpgsql(connectionString));
  builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
