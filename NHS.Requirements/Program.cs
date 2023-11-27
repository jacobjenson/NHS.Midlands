using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NHS.Api.DAL;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("strong-secret-la-la-la")),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

CreateDb(builder);

var app = builder.Build();

app.UseCors();

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<RequirementContext>();
context.Database.EnsureCreated();

// Configure the HTTP request pipeline.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

static void CreateDb(WebApplicationBuilder builder)
{
    string dir = Path.Combine(Environment.CurrentDirectory, "db");

    if (!Directory.Exists(dir))
    {
        Directory.CreateDirectory(dir);
    }

    string path = Path.Combine(Environment.CurrentDirectory, @"db\requirements.db");

    builder.Services.AddDbContext<RequirementContext>(options =>
        options.UseSqlite($"Data Source={path}"));
}