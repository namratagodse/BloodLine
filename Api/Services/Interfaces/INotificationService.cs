using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Services.Interfaces
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationDto>> GetForUserAsync(int userId);
        Task MarkAsSeenAsync(int notificationId);
    }
}
