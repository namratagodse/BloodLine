using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BloodLine.Application.Services;
using BloodLine.Domain.Enums;
using System;

namespace BloodLine.API.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "SuperAdmin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _adminService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPut("role/{userId}")]
        public async Task<IActionResult> UpdateUserRole(Guid userId, [FromQuery] Role newRole)
        {
            var result = await _adminService.UpdateUserRoleAsync(userId, newRole);
            return Ok(new { message = result });
        }

        [HttpDelete("user/{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            var result = await _adminService.DeleteUserAsync(userId);
            return Ok(new { message = result });
        }

        [HttpGet("bloodbanks")]
        public async Task<IActionResult> GetBloodBankInventories()
        {
            var result = await _adminService.GetAllBloodBankInventoriesAsync();
            return Ok(result);
        }

        [HttpGet("requests")]
        public async Task<IActionResult> GetAllBloodRequests()
        {
            var result = await _adminService.GetAllBloodRequestsAsync();
            return Ok(result);
        }
    }
}
