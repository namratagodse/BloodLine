namespace WebApplication2.Api.DTOs
{
    public class AuditLogDto
    {
        public int LogId { get; set; }
        public int UserId { get; set; }
        public string Action { get; set; }
        public string EntityAffected { get; set; }
        public DateTime Timestamp { get; set; }

    }
}
