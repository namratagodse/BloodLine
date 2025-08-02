using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BloodInventoryController : ControllerBase
    {
        private readonly IAdminDashboardService _adminSvc;

        public BloodInventoryController(IAdminDashboardService adminSvc)
            => _adminSvc = adminSvc;

        [HttpGet("summary")]
        public async Task<IActionResult> Summary()
            => Ok(await _adminSvc.GetBloodInventorySummaryAsync());
    }
}
