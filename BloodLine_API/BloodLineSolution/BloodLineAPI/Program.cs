using BloodLineAPI.BAL;
using BloodLineAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace BloodLineAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ✅ Add configuration from appsettings.json
            var config = builder.Configuration;
            var jwtKey = config["Jwt:Key"];
            var jwtIssuer = config["Jwt:Issuer"];

            // ✅ Add services
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            // ✅ Add Swagger with JWT support
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BloodLine API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // ✅ Configure JWT Authentication
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false; // for local development
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtIssuer,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                    };
                });

            // ✅ Define CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000", "https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            builder.Services.AddScoped<UserBAL>();
            builder.Services.AddScoped<JwtService>();

            var app = builder.Build();

            // ✅ Enable Swagger in all environments
            //app.UseSwagger();
            //app.UseSwaggerUI();

            // ✅ Redirect root URL to Swagger
            //app.MapGet("/", context =>
            //{
            //    context.Response.Redirect("/");
            //    return Task.CompletedTask;
            //});

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = "swagger"; // ✅ This maps it to /swagger instead of /
            });
            // ✅ Apply CORS policy
            app.UseCors("AllowFrontend");

            app.UseHttpsRedirection();

            // ✅ Use Authentication & Authorization
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.UseStaticFiles();
            app.MapFallbackToFile("index.html");
            app.Run();
        }
    }
}
