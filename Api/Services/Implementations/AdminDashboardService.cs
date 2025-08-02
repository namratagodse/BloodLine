using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Services.Interfaces;
using WebApplication2.Api.Models;

namespace WebApplication2.Api.Services.Implementations
{
    public class AdminDashboardService : IAdminDashboardService
    {
        private readonly BloodLineDbContext _context;

        public AdminDashboardService(BloodLineDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetBloodRequestCountAsync()
            => await _context.BloodRequests.CountAsync();

        public async Task<int> GetDonationRequestCountAsync()
            => await _context.DonationRequests.CountAsync();

        public async Task<List<BloodInventorySummaryDto>> GetBloodInventorySummaryAsync()
            => await _context.BloodInventory
                .GroupBy(b => b.BloodGroup)
                .Select(g => new BloodInventorySummaryDto
                {
                    BloodGroup = g.Key,
                    TotalUnits = (int)g.Sum(x => x.UnitsAvailable)
                }).ToListAsync();
    }
}
