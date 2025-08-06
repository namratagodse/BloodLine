using BloodLineAPI.BAL;
using BloodLineAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BloodLineAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BloodRequestController : ControllerBase
    {
        private readonly BloodRequestBAL _bloodRequestBAL;

        public BloodRequestController(IConfiguration configuration)
        {
            _bloodRequestBAL = new BloodRequestBAL(configuration);
        }

        [HttpGet("getbystatuswithuser/{status}")]
        public IActionResult GetRequestsByStatusWithUser(string status, [FromQuery] int? bloodBankId = null)
        {
            var result = _bloodRequestBAL.GetRequestsByStatusWithUser(status, bloodBankId);
            return Ok(result);
        }

        [HttpPost("updatestatus")]
        public IActionResult UpdateStatus([FromBody] UpdateRequestModel model)
        {
            var result = _bloodRequestBAL.UpdateRequestStatus(model);
            return Ok(result);
        }

        [HttpGet("getallwithuser")]
        public IActionResult GetAllRequestsWithUser([FromQuery] int? bloodBankId = null)
        {
            var result = _bloodRequestBAL.GetAllRequestsWithUser(bloodBankId);
            return Ok(result);
        }

        [HttpGet("requestcounts")]
        public IActionResult GetRequestCounts([FromQuery] int? bloodBankId = null)
        {
            try
            {
                BloodRequestCountModel counts = _bloodRequestBAL.GetRequestCounts(bloodBankId);
                return Ok(counts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult InsertBloodRequest([FromBody] BloodRequestModel model)
        {
            if (_bloodRequestBAL.InsertBloodRequest(model))
            {
                return Ok(new { success = true, message = "Blood request submitted successfully." });
            }

            return BadRequest(new { success = false, message = "Failed to submit blood request." });
        }
    }
}
