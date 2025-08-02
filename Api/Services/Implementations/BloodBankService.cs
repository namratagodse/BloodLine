using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class BloodBankService : IBloodBankService
    {
        private readonly BloodLineDbContext _context;
        private readonly IMapper _mapper;

        public BloodBankService(BloodLineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(BloodBankDto dto)
        {
            var entity = _mapper.Map<BloodBank>(dto);
            _context.BloodBanks.Add(entity);
            await _context.SaveChangesAsync();
            return entity.BloodBankId;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.BloodBanks.FindAsync(id);
            if (entity == null) return;
            _context.BloodBanks.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BloodBankDto>> GetAllAsync()
        {
            var entities = await _context.BloodBanks.ToListAsync();
            return _mapper.Map<List<BloodBankDto>>(entities);
        }

        public async Task<BloodBankDto> GetByIdAsync(int id)
        {
            var entity = await _context.BloodBanks.FindAsync(id);
            return _mapper.Map<BloodBankDto>(entity);
        }

        public async Task UpdateAsync(int id, BloodBankDto dto)
        {
            var entity = await _context.BloodBanks.FindAsync(id);
            if (entity == null) return;
            _mapper.Map(dto, entity);
            await _context.SaveChangesAsync();
        }
    }
}
