// Program.cs

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;
using WebApplication2.Api.Data;
using WebApplication2.Api.Services.Implementations;
using WebApplication2.Api.Services.Interfaces;
using WebApplication2.Extensions;

var builder = WebApplication.CreateBuilder(args);

// ─── Serilog Configuration ─────────────────────────────────────────
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();
builder.Host.UseSerilog();

// ─── Database Context ────────────────────────────────────────────────
builder.Services.AddDbContext<BloodLineDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ─── AutoMapper ──────────────────────────────────────────────────────
builder.Services.AddAutoMapper(typeof(Program));

// ─── Application Services ────────────────────────────────────────────
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAdminDashboardService, AdminDashboardService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBloodBankService, BloodBankService>();
builder.Services.AddScoped<IBloodRequestService, BloodRequestService>();
builder.Services.AddScoped<IDonationRequestService, DonationRequestService>();
builder.Services.AddScoped<IDonationService, DonationService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IAdminActionService, AdminActionService>();
builder.Services.AddScoped<IOtpVerificationService, OtpVerificationService>();
builder.Services.AddScoped<IAuditLogService, AuditLogService>();

// ─── Cross-Cutting Concerns ───────────────────────────────────────────
// FluentValidation, JWT Auth, AWS Secrets, CORS, Rate Limiting
builder.Services
    .AddFluentValidationServices()
    .AddJwtAuthentication(builder.Configuration)
    .AddRateLimiting(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // adjust to your front-end URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddMemoryCache();
builder.Services.AddRateLimiting(builder.Configuration);

// ─── Controllers, Health Checks, Swagger ─────────────────────────────
builder.Services.AddHealthChecks();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ─── Middleware Pipeline ─────────────────────────────────────────────
app.UseSerilogRequestLogging();       // structured request logging
app.UseGlobalExceptionHandler();      // unified error handling

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseRateLimiting();                // simple per-IP throttling

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "BloodLine API V1");
    c.RoutePrefix = string.Empty;     // serve Swagger at root
});

app.MapHealthChecks("/health");       // readiness/liveness probe

app.Run();
