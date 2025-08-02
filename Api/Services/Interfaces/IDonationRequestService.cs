using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IDonationRequestService
    {
        Task<IEnumerable<DonationRequestDto>> GetAllAsync();
        Task<DonationRequestDto> GetByIdAsync(int id);
        Task<int> CreateAsync(DonationRequestDto dto);
        Task UpdateStatusAsync(int id, string newStatus);
        Task DeleteAsync(int id);
    }
}
