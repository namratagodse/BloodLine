namespace BloodLineAPI.Model
{
    public class BloodRequestModel
    {
        public int RequestId { get; set; }
        public int RequesterId { get; set; }
        public string RequesterName { get; set; }

        public int? BloodBankId { get; set; } // ✅ New field
        public string? BloodBankName { get; set; } // ✅ Optional (if joined with UserMaster)

        public string BloodGroup { get; set; }
        public int UnitsRequired { get; set; }
        public DateTime RequiredDate { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
    }
}
