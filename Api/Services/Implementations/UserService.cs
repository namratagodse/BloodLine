using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly BloodLineDbContext _context;
        private readonly IMapper _mapper;

        public UserService(BloodLineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(RegisterDto dto)
        {
            var entity = _mapper.Map<User>(dto);
            _context.Users.Add(entity);
            await _context.SaveChangesAsync();
            return entity.UserId;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.Users.FindAsync(id);
            if (entity == null) return;
            _context.Users.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var entities = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDto>>(entities);
        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            var entity = await _context.Users.FindAsync(id);
            return _mapper.Map<UserDto>(entity);
        }

        public async Task UpdateAsync(int id, UserDto dto)
        {
            var entity = await _context.Users.FindAsync(id);
            if (entity == null) return;
            _mapper.Map(dto, entity);
            await _context.SaveChangesAsync();
        }
    }
}
