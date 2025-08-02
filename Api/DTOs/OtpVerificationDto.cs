namespace WebApplication2.Api.DTOs
{
    public class OtpVerificationDto
    {
        public int OtpId { get; set; }
        public string Email { get; set; }
        public string OtpCode { get; set; }
        public DateTime ExpiryTime { get; set; }
        public bool Verified { get; set; }

    }
}
