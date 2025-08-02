using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class OtpVerificationService : IOtpVerificationService
    {
        private readonly BloodLineDbContext _context;

        public OtpVerificationService(BloodLineDbContext context)
        {
            _context = context;
        }

        public async Task<int> GenerateOtpAsync(string email)
        {
            var code = new Random().Next(100000, 999999).ToString();
            var entity = new OtpVerification
            {
                Email = email,
                OtpCode = code,
                ExpiryTime = DateTime.UtcNow.AddMinutes(10),
                Verified = false
            };
            _context.OtpVerifications.Add(entity);
            await _context.SaveChangesAsync();
            return entity.OtpId;
        }

        public async Task<bool> VerifyOtpAsync(OtpVerificationDto dto)
        {
            var entity = await _context.OtpVerifications
                .FirstOrDefaultAsync(o => o.Email == dto.Email && o.OtpCode == dto.OtpCode);
            if (entity == null || entity.ExpiryTime < DateTime.UtcNow) return false;
            entity.Verified = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
