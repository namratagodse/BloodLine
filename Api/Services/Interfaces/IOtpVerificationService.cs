using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IOtpVerificationService
    {
        Task<int> GenerateOtpAsync(string email);
        Task<bool> VerifyOtpAsync(OtpVerificationDto dto);

    }
}
