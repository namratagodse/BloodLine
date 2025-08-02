namespace WebApplication2.Api.DTOs
{
    public class NotificationDto
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public bool Seen { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
