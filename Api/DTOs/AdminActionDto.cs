namespace WebApplication2.Api.DTOs
{
    public class AdminActionDto
    {
        public int ActionId { get; set; }
        public int AdminId { get; set; }
        public string ActionType { get; set; }
        public string TargetEntity { get; set; }
        public string Notes { get; set; }
        public DateTime Timestamp { get; set; }

    }
}
