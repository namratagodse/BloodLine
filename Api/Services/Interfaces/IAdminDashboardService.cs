using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IAdminDashboardService
    {
        Task<int> GetBloodRequestCountAsync();
        Task<int> GetDonationRequestCountAsync();
        Task<List<BloodInventorySummaryDto>> GetBloodInventorySummaryAsync();

    }
}
