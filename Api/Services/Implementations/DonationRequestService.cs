using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class DonationRequestService : IDonationRequestService
    {
        private readonly BloodLineDbContext _context;
        private readonly IMapper _mapper;

        public DonationRequestService(BloodLineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(DonationRequestDto dto)
        {
            var entity = _mapper.Map<DonationRequest>(dto);
            entity.CreatedAt = DateTime.UtcNow;
            _context.DonationRequests.Add(entity);
            await _context.SaveChangesAsync();
            return entity.DonationRequestId;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.DonationRequests.FindAsync(id);
            if (entity == null) return;
            _context.DonationRequests.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DonationRequestDto>> GetAllAsync()
        {
            var entities = await _context.DonationRequests.ToListAsync();
            return _mapper.Map<List<DonationRequestDto>>(entities);
        }

        public async Task<DonationRequestDto> GetByIdAsync(int id)
        {
            var entity = await _context.DonationRequests.FindAsync(id);
            return _mapper.Map<DonationRequestDto>(entity);
        }

        public async Task UpdateStatusAsync(int id, string newStatus)
        {
            var entity = await _context.DonationRequests.FindAsync(id);
            if (entity == null) return;
            entity.Status = newStatus;
            await _context.SaveChangesAsync();
        }
    }
}
