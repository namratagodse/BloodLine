using BloodLineAPI.BAL;
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

    }
}
