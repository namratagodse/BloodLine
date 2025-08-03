using BloodLine_Backend.BAL;
using BloodLineAPI.Model;
using BloodLineAPI.Services;
using Microsoft.AspNetCore.Authorization; // ✅ Make sure this is at the top
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BloodLine_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserBAL _userBAL;
        private readonly JwtService _jwtService;

        public UserController(IConfiguration configuration)
        {
            _userBAL = new UserBAL(configuration);
            _jwtService = new JwtService(configuration);
        }

        // ✅ REGISTER
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

        // ✅ LOGIN
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest login)
        {
            try
            {
                var user = _userBAL.LoginUser(login.Email, login.Password);
                if (user != null)
                {
                    var token = _jwtService.GenerateJwtToken(user.Email, user.Role);

                    return Ok(new
                    {
                        message = "Login successful",
                        token,
                        user.UserID,
                        user.FullName,
                        user.Email,
                        user.Role
                    });
                }
                else
                {
                    return Unauthorized(new { message = "Invalid email or password" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error: " + ex.Message });
            }
        }

        // ✅ PROFILE (Protected Endpoint)
        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetUserProfile()
        {
            // Extract claims from JWT token
            var email = User.FindFirstValue(ClaimTypes.Email);
            var role = User.FindFirstValue(ClaimTypes.Role);

            return Ok(new
            {
                message = "Profile data retrieved successfully",
                email,
                role
            });
        }
    }
}
