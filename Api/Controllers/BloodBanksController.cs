using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Services.Interfaces;
using WebApplication2.Settings;

namespace WebApplication2.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BloodBanksController : ControllerBase
    {
        private readonly IBloodBankService _svc;

        public BloodBanksController(IBloodBankService svc)
            => _svc = svc;

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _svc.GetAllAsync());

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var bb = await _svc.GetByIdAsync(id);
            if (bb == null) return NotFound();
            return Ok(bb);
        }

        [HttpPost]
        [Authorize(Policy = PolicyDefinitions.AdminOnly)]
        public async Task<IActionResult> Create([FromBody] BloodBankDto dto)
        {
            var id = await _svc.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id }, dto);
        }

        [HttpPut("{id:int}")]
        [Authorize(Policy = PolicyDefinitions.AdminOnly)]
        public async Task<IActionResult> Update(int id, [FromBody] BloodBankDto dto)
        {
            await _svc.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Policy = PolicyDefinitions.AdminOnly)]
        public async Task<IActionResult> Delete(int id)
        {
            await _svc.DeleteAsync(id);
            return NoContent();
        }
    }
}
