namespace WebApplication2.Api.DTOs
{
    public class DonationRequestDto
    {
        public int DonationRequestId { get; set; }
        public int DonorId { get; set; }
        public int BloodBankId { get; set; }
        public DateTime PreferredDate { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
