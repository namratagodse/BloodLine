using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Api.Services.Interfaces;
using WebApplication2.Settings;

namespace WebApplication2.Api.Controllers
{
   
        [ApiController]
        [Route("api/[controller]")]
        [Authorize(Policy = PolicyDefinitions.AdminOnly)]
        public class AdminController : ControllerBase
        {
            private readonly IAdminDashboardService _dashboard;

            public AdminController(IAdminDashboardService dashboard)
            {
                _dashboard = dashboard;
            }

            [HttpGet("blood-requests/count")]
            public async Task<IActionResult> GetBloodRequestCount()
                => Ok(await _dashboard.GetBloodRequestCountAsync());

            [HttpGet("donation-requests/count")]
            public async Task<IActionResult> GetDonationRequestCount()
                => Ok(await _dashboard.GetDonationRequestCountAsync());

            [HttpGet("blood-inventory/summary")]
            public async Task<IActionResult> GetInventory()
                => Ok(await _dashboard.GetBloodInventorySummaryAsync());
        }
    }

