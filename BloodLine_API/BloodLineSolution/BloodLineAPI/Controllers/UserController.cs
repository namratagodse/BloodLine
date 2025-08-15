using Azure.Core;
using BloodLineAPI.BAL;
using BloodLineAPI.Model;
using BloodLineAPI.Services;
using BloodLineAPI.Utilities;
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;

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
                    var token = _jwtService.GenerateJwtToken(user.UserID.Value, user.Email, user.Role);

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

        // PROFILE (Protected Endpoint)
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

        [HttpGet("GetAllDonors")]
        public IActionResult GetAllDonors()
        {
            var donors = _userBAL.GetAllDonors();
            return Ok(donors);
        }

        [HttpGet("GetAllReceivers")]
        public IActionResult GetAllReceivers()
        {
            var receivers = _userBAL.GetAllReceivers();
            return Ok(receivers);
        }

        [HttpGet("GetAllBloodBanks")]
        public IActionResult GetAllBloodBanks()
        {
            var bloodbanks = _userBAL.GetAllBloodBanks();
            return Ok(bloodbanks);
        }

        [HttpPut("UpdateUser")]
        public IActionResult UpdateUser([FromBody] UserModel user)
        {
            try
            {
                var result = _userBAL.UpdateUser(user);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("DeleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                var result = _userBAL.DeleteUser(id);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("ToggleUserStatus/{id}")]
        public IActionResult ToggleUserStatus(int id)
        {
            var user = _userBAL.GetUserById(id);
            if (user == null) return NotFound();

            bool newStatus = !(user.IsActive ?? false);
            var result = _userBAL.ToggleUserStatus(id, newStatus);
            return Ok(new { message = result });
        }

        [HttpGet("admindashboardcounts")]
        public IActionResult GetAdminDashboardCounts()
        {
            var counts = _userBAL.GetAdminDashboardCounts();
            return Ok(counts);
        }

        [HttpGet("GetBloodBanksByDistrict/{districtName}")]
        public IActionResult GetBloodBanksByDistrict(string districtName)
        {
            try
            {
                var bloodBanks = _userBAL.GetBloodBanksByDistrict(districtName);
                if (bloodBanks == null || bloodBanks.Count == 0)
                {
                    return NotFound("No blood banks found for the given district.");
                }

                return Ok(bloodBanks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }

        [HttpPost("test")]
        public IActionResult Test([FromBody] PasswordDTO request)
        {
            //var counts = _userBAL.GetAdminDashboardCounts();
            //return Ok(counts);
            const int SaltSize = 16;      // 128-bit
            const int HashSize = 32;      // 256-bit
            const int Iterations = 100000;
            if (request.Password == null) throw new ArgumentNullException(nameof(request.Password));

            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
            using var pbkdf2 = new Rfc2898DeriveBytes(request.Password, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(HashSize);

            byte[] hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            return Ok(Convert.ToBase64String(hashBytes));
        }
    }
    }
