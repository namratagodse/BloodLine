using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class AuditLogService : IAuditLogService
    {
        private readonly BloodLineDbContext _context;
        private readonly IMapper _mapper;

        public AuditLogService(BloodLineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> LogAsync(AuditLogDto dto)
        {
            var entity = _mapper.Map<AuditLog>(dto);
            _context.AuditLogs.Add(entity);
            await _context.SaveChangesAsync();
            return entity.LogId;
        }

        public async Task<IEnumerable<AuditLogDto>> GetAllAsync()
        {
            var entities = await _context.AuditLogs.ToListAsync();
            return _mapper.Map<List<AuditLogDto>>(entities);
        }
    }
}
