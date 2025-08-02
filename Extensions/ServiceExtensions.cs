using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApplication2.Middleware;
using WebApplication2.Settings;

namespace WebApplication2.Extensions
{
    public static  class ServiceExtensions
    {
        public static IServiceCollection AddFluentValidationServices(this IServiceCollection services)
        {
            // Registers all validators in the assembly
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssembly(typeof(ServiceExtensions).Assembly);
            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>();
            services.AddSingleton(jwtSettings);

            var keyBytes = Encoding.ASCII.GetBytes(jwtSettings.Secret);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opts =>
            {
                opts.RequireHttpsMetadata = true;
                opts.SaveToken = true;
                opts.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                    ClockSkew = TimeSpan.Zero
                };
            });

            // Example policy—you can adjust roles/claims as needed
            services.AddAuthorization(opts =>
            {
                opts.AddPolicy("AdminOnly", policy =>
                    policy.RequireClaim(System.Security.Claims.ClaimTypes.Role, "Admin"));
            });

            return services;
        }

        

        public static IServiceCollection AddRateLimiting(this IServiceCollection services, IConfiguration config)
        {
            // Bind RateLimitingOptions from configuration
            services.Configure<RateLimitingOptions>(config.GetSection("RateLimiting"));

            // Needed by the middleware for tracking counts
            services.AddMemoryCache();

            return services;
        }
    }
}
