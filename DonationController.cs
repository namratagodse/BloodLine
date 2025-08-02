using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BloodLine.Application.DTOs;
using BloodLine.Application.Services;

namespace BloodLine.API.Controllers
{
    [ApiController]
    [Route("api/donation")]
    [Authorize(Roles = "Donor")]
    public class DonationController : ControllerBase
    {
        private readonly IDonationService _donationService;

        public DonationController(IDonationService donationService)
        {
            _donationService = donationService;
        }

        [HttpPost]
        public async Task<IActionResult> Donate([FromBody] DonationRequestDto dto)
        {
            var result = await _donationService.DonateAsync(dto);
            return Ok(new { message = result });
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetDonationHistory()
        {
            var email = User.Identity?.Name;
            var history = await _donationService.GetDonationsByUserAsync(email!);
            return Ok(history);
        }
    }
}
