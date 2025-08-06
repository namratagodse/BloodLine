using Microsoft.AspNetCore.Mvc;
using BloodLineAPI.BAL;
using BloodLineAPI.Model;

namespace BloodLineAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BloodDonationController : ControllerBase
    {
        private readonly BloodDonationBAL _donationBAL;

        public BloodDonationController(IConfiguration configuration)
        {
            _donationBAL = new BloodDonationBAL(configuration);
        }

        [HttpPost("InsertDonation")]
        public IActionResult InsertDonation([FromBody] BloodDonationModel model)
        {
            if (model == null || model.DonorID <= 0 || model.BloodBankID <= 0 || model.UnitsDonated <= 0)
                return BadRequest("Invalid data.");

            bool result = _donationBAL.InsertDonation(model);

            if (result)
                return Ok(new { message = "Donation recorded successfully." });
            else
                return StatusCode(500, "Failed to insert donation.");
        }

        [HttpGet("GetDonationsByDonorId/{donorId}")]
        public IActionResult GetDonationsByDonorId(int donorId)
        {
            if (donorId <= 0)
                return BadRequest("Invalid Donor ID.");

            List<BloodDonationModel> donations = _donationBAL.GetDonationsByDonorId(donorId);

            if (donations == null || donations.Count == 0)
                return NotFound("No donation records found.");

            return Ok(donations);
        }
    }
}
