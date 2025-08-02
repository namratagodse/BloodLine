using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class AdminActionService : IAdminActionService
    {
        private readonly BloodLineDbContext _context;
        private readonly IMapper _mapper;

        public AdminActionService(BloodLineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> LogActionAsync(AdminActionDto dto)
        {
            var entity = _mapper.Map<AdminAction>(dto);
            _context.AdminActions.Add(entity);
            await _context.SaveChangesAsync();
            return entity.ActionId;
        }

        public async Task<IEnumerable<AdminActionDto>> GetAllAsync()
        {
            var entities = await _context.AdminActions.ToListAsync();
            return _mapper.Map<List<AdminActionDto>>(entities);
        }
    }

}
