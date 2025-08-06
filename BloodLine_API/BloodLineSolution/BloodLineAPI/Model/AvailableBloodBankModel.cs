namespace BloodLineAPI.Model
{
    public class AvailableBloodBankModel
    {
        public int BloodBankId { get; set; }
        public string BloodBankName { get; set; }
        public string District { get; set; }
        public string BloodGroup { get; set; }
        public int UnitsAvailable { get; set; }
    }
}
