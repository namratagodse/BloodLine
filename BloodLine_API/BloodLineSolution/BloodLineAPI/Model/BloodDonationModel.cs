namespace BloodLineAPI.Model
{
    public class BloodDonationModel
    {
        public int? DonationID { get; set; }           // Primary Key
        public int DonorID { get; set; }               // Foreign Key to UserMaster
        public string? DonorName { get; set; }
        public int BloodBankID { get; set; }           // Foreign Key to UserMaster (role: blood bank)
        public string BloodGroup { get; set; }
        public string? Gender { get; set; }
        public int UnitsDonated { get; set; }
        public DateTime? DonationDate { get; set; }     // Defaulted to GETDATE() in DB
        public DateTime? NextDonationDate { get; set; } // New: 90 days after DonationDate
        public string? BloodBankName { get; set; }
        public bool? IsAddedToInventory { get; set; }
    }
}
