using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Services.Interfaces;
using WebApplication2.Settings;

namespace WebApplication2.Api.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly BloodLineDbContext _context;
        private readonly JwtSettings _jwtSettings;

        public AuthService(BloodLineDbContext context, JwtSettings jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings;
        }

        public async Task<AuthResponseDto> AuthenticateAsync(LoginRequestDto login)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == login.Username && u.Password == login.Password);

            if (user == null)
                throw new UnauthorizedAccessException("Invalid credentials.");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Name, user.FullName),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(descriptor);
            return new AuthResponseDto
            {
                Token = tokenHandler.WriteToken(token),
                Expiration = descriptor.Expires.Value
            };
        }
    }
}
