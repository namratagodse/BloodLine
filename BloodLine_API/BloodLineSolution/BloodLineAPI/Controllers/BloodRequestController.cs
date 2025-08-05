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
        public IActionResult GetRequestsByStatusWithUser(string status)
        {
            var result = _bloodRequestBAL.GetRequestsByStatusWithUser(status);
            return Ok(result);
        }

        [HttpPost("updatestatus")]
        public IActionResult UpdateStatus([FromBody] UpdateRequestModel model)
        {
            var result = _bloodRequestBAL.UpdateRequestStatus(model);
            return Ok(result);
        }

        [HttpGet("getallwithuser")]
        public IActionResult GetAllRequestsWithUser()
        {
            var result = _bloodRequestBAL.GetAllRequestsWithUser();
            return Ok(result);
        }
    }
}
