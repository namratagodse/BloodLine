namespace WebApplication2.Api.DTOs
{
    public class BloodRequestDto
    {
        public int RequestId { get; set; }
        public int ReceiverId { get; set; }
        public string PatientName { get; set; }
        public string HospitalName { get; set; }
        public string RequiredBloodGroup { get; set; }
        public int BloodBankId { get; set; }
        public int UnitsRequested { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
