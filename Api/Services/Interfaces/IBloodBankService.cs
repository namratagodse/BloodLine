using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IBloodBankService
    {
        Task<IEnumerable<BloodBankDto>> GetAllAsync();
        Task<BloodBankDto> GetByIdAsync(int id);
        Task<int> CreateAsync(BloodBankDto dto);
        Task UpdateAsync(int id, BloodBankDto dto);
        Task DeleteAsync(int id);
    }
}
