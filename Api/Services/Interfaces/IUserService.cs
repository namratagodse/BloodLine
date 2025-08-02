using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<UserDto> GetByIdAsync(int id);
        Task<int> CreateAsync(RegisterDto dto);
        Task UpdateAsync(int id, UserDto dto);
        Task DeleteAsync(int id);
    }
}
