using BloodLineAPI.BAL;
using BloodLineAPI.Model;
using BloodLineAPI.Services;
using Microsoft.AspNetCore.Identity;
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
        private readonly IPasswordHasher<UserModel> _passwordHasher;

        public UserController(
            UserBAL userBAL,
            JwtService jwtService,
            IPasswordHasher<UserModel> passwordHasher)
        {
            _userBAL = userBAL;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
        }

        // ── REGISTER ─────────────────────────────────────────────────────
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserModel user)
        {
            try
            {
                // Normalize email
                user.Email = user.Email.Trim().ToLowerInvariant();

                // Hash the plaintext password the UI sent in PasswordHash
                var plain = user.PasswordHash!;
                user.PasswordHash = _passwordHasher.HashPassword(user, plain);

                // Set up action flags
                user.Action = "INSERT";
                user.IsActive = true;

                _userBAL.RegisterUser(user);
                return Ok(new { message = "Registration successful" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // ── LOGIN ────────────────────────────────────────────────────────
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest login)
        {
            try
            {
                // Normalize & lookup by plain email
                var email = login.Email.Trim().ToLowerInvariant();
                var user = _userBAL.GetByEmail(email);

                if (user == null)
                    return Unauthorized(new { message = "Invalid credentials" });

                // Verify password against stored hash
                var res = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash!, login.Password);
                if (res != PasswordVerificationResult.Success)
                    return Unauthorized(new { message = "Invalid credentials" });

                // Generate JWT
                var token = _jwtService.GenerateJwtToken(
                    user.UserID!.Value,
                    user.Email,
                    user.Role);

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
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // ── PROFILE ──────────────────────────────────────────────────────
        [HttpGet("profile")]
        public IActionResult GetUserProfile()
        {
            var sub = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = User.FindFirstValue(ClaimTypes.Email);
            var role = User.FindFirstValue(ClaimTypes.Role);
            return Ok(new { userId = sub, email, role });
        }

        // ── OTHER ENDPOINTS (unchanged) ──────────────────────────────────

        [HttpGet("GetAllDonors")]
        public IActionResult GetAllDonors() =>
            Ok(_userBAL.GetAllDonors());

        [HttpGet("GetAllReceivers")]
        public IActionResult GetAllReceivers() =>
            Ok(_userBAL.GetAllReceivers());

        [HttpGet("GetAllBloodBanks")]
        public IActionResult GetAllBloodBanks() =>
            Ok(_userBAL.GetAllBloodBanks());

        [HttpPut("UpdateUser")]
        public IActionResult UpdateUser([FromBody] UserModel user) =>
            Ok(new { message = _userBAL.UpdateUser(user) });

        [HttpDelete("DeleteUser/{id}")]
        public IActionResult DeleteUser(int id) =>
            Ok(new { message = _userBAL.DeleteUser(id) });

        [HttpPost("ToggleUserStatus/{id}")]
        public IActionResult ToggleUserStatus(int id, [FromBody] bool isActive) =>
            Ok(new { message = _userBAL.ToggleUserStatus(id, isActive) });

        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(int id) =>
            Ok(_userBAL.GetUserById(id));

        [HttpGet("GetAdminDashboardCounts")]
        public IActionResult GetAdminDashboardCounts() =>
            Ok(_userBAL.GetAdminDashboardCounts());

        [HttpGet("GetBloodBanksByDistrict/{districtName}")]
        public IActionResult GetBloodBanksByDistrict(string districtName) =>
            Ok(_userBAL.GetBloodBanksByDistrict(districtName));
    }
}
