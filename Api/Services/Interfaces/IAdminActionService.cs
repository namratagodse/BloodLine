using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IAdminActionService
    {
        Task<IEnumerable<AdminActionDto>> GetAllAsync();
        Task<int> LogActionAsync(AdminActionDto dto);
    }
}
