using Microsoft.AspNetCore.Mvc;
using BloodLineAPI.BAL;

namespace BloodLineAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BloodInventoryController : ControllerBase
    {
        private readonly BloodInventoryBAL _inventoryBAL;

        public BloodInventoryController(IConfiguration configuration)
        {
            _inventoryBAL = new BloodInventoryBAL(configuration);
        }

        [HttpPost("AddDonationToInventory/{donationId}")]
        public IActionResult AddDonationToInventory(int donationId)
        {
            if (donationId <= 0)
                return BadRequest("Invalid donation ID.");

            bool result = _inventoryBAL.AddToInventory(donationId);

            if (result)
                return Ok(new { message = "Donation added to inventory successfully." });
            else
                return StatusCode(500, "Failed to add donation to inventory.");
        }

        [HttpGet("GetInventoryByBloodBankId/{bloodBankId}")]
        public IActionResult GetInventoryByBloodBankId(int bloodBankId)
        {
            var inventory = _inventoryBAL.GetInventoryByBloodBankId(bloodBankId);
            return Ok(inventory);
        }
    }
}
