using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Data;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Services.Interfaces;

namespace WebApplication2.Api.Services.Implementations
{
    public class NotificationService : INotificationService
    {
        private readonly BloodLineDbContext _context;
        private readonly IMapper _mapper;

        public NotificationService(BloodLineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<NotificationDto>> GetForUserAsync(int userId)
        {
            var entities = await _context.Notifications
                .Where(n => n.UserId == userId)
                .ToListAsync();
            return _mapper.Map<List<NotificationDto>>(entities);
        }

        public async Task MarkAsSeenAsync(int notificationId)
        {
            var entity = await _context.Notifications.FindAsync(notificationId);
            if (entity == null) return;
            entity.Seen = true;
            await _context.SaveChangesAsync();
        }
    }
}
