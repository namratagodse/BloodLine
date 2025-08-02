using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IDonationService
    {
        Task<IEnumerable<DonationDto>> GetAllAsync();
        Task<DonationDto> GetByIdAsync(int id);
        Task<int> CreateAsync(DonationDto dto);
    }
}
