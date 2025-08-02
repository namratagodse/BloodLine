using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class BloodRequestService : IBloodRequestService
    {
        private readonly BloodLineDbContext _context;
        private readonly IMapper _mapper;

        public BloodRequestService(BloodLineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(BloodRequestDto dto)
        {
            var entity = _mapper.Map<BloodRequest>(dto);
            entity.CreatedAt = DateTime.UtcNow;
            _context.BloodRequests.Add(entity);
            await _context.SaveChangesAsync();
            return entity.RequestId;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.BloodRequests.FindAsync(id);
            if (entity == null) return;
            _context.BloodRequests.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BloodRequestDto>> GetAllAsync()
        {
            var entities = await _context.BloodRequests.ToListAsync();
            return _mapper.Map<List<BloodRequestDto>>(entities);
        }

        public async Task<BloodRequestDto> GetByIdAsync(int id)
        {
            var entity = await _context.BloodRequests.FindAsync(id);
            return _mapper.Map<BloodRequestDto>(entity);
        }

        public async Task UpdateStatusAsync(int id, string newStatus)
        {
            var entity = await _context.BloodRequests.FindAsync(id);
            if (entity == null) return;
            entity.Status = newStatus;
            await _context.SaveChangesAsync();
        }
    }
}
