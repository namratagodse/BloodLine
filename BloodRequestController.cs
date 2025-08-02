using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BloodLine.Application.DTOs;
using BloodLine.Application.Services;

namespace BloodLine.API.Controllers
{
    [ApiController]
    [Route("api/bloodrequest")]
    [Authorize(Roles = "Receiver")]
    public class BloodRequestController : ControllerBase
    {
        private readonly IBloodRequestService _requestService;

        public BloodRequestController(IBloodRequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] BloodRequestDto dto)
        {
            var result = await _requestService.CreateRequestAsync(dto);
            return Ok(new { message = result });
        }

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var email = User.Identity?.Name;
            var requests = await _requestService.GetRequestsByUserAsync(email!);
            return Ok(requests);
        }
    }
}
