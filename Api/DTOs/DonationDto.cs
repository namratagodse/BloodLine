namespace WebApplication2.Api.DTOs
{
    public class DonationDto
    {
        public int DonationId { get; set; }
        public int DonorId { get; set; }
        public int BloodBankId { get; set; }
        public string BloodGroup { get; set; }
        public int UnitsDonated { get; set; }
        public DateTime DonationDate { get; set; }
        public string AcknowledgementUrl { get; set; }

    }
}
