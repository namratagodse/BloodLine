using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class DonationService : IDonationService
    {
        private readonly BloodLineDbContext _context;
        private readonly IMapper _mapper;

        public DonationService(BloodLineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(DonationDto dto)
        {
            var entity = _mapper.Map<Donation>(dto);
            _context.Donations.Add(entity);
            await _context.SaveChangesAsync();
            return entity.DonationId;
        }

        public async Task<IEnumerable<DonationDto>> GetAllAsync()
        {
            var entities = await _context.Donations.ToListAsync();
            return _mapper.Map<List<DonationDto>>(entities);
        }

        public async Task<DonationDto> GetByIdAsync(int id)
        {
            var entity = await _context.Donations.FindAsync(id);
            return _mapper.Map<DonationDto>(entity);
        }
    }

}
