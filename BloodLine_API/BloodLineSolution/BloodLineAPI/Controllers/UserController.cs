using BloodLine_Backend.BAL;
using BloodLineAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace BloodLine_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserBAL _userBAL;

        public UserController(IConfiguration configuration)
        {
            _userBAL = new UserBAL(configuration);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserModel user)
        {
            try
            {
                user.Action = "INSERT";
                user.IsActive = true;
                _userBAL.RegisterUser(user);
                return Ok(new { message = "Registration successful" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error: " + ex.Message });
            }
        }
    }
}
