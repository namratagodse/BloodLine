using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IAuditLogService
    {
        Task<IEnumerable<AuditLogDto>> GetAllAsync();
        Task<int> LogAsync(AuditLogDto dto);
    }
}
