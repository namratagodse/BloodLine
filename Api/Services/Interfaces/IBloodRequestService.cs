using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IBloodRequestService
    {
        Task<IEnumerable<BloodRequestDto>> GetAllAsync();
        Task<BloodRequestDto> GetByIdAsync(int id);
        Task<int> CreateAsync(BloodRequestDto dto);
        Task UpdateStatusAsync(int id, string newStatus);
        Task DeleteAsync(int id);
    }
}
