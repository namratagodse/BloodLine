using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BloodLine.Application.Services;

namespace BloodLine.API.Controllers
{
    [ApiController]
    [Route("api/bloodbank")]
    [Authorize(Roles = "BloodBankAdmin")]
    public class BloodBankController : ControllerBase
    {
        private readonly IBloodBankRepository _bloodBankRepo;

        public BloodBankController(IBloodBankRepository bloodBankRepo)
        {
            _bloodBankRepo = bloodBankRepo;
        }

        [HttpGet("inventory")]
        public async Task<IActionResult> GetAllInventories()
        {
            var banks = await _bloodBankRepo.GetAllAsync();
            return Ok(banks);
        }
    }
}
