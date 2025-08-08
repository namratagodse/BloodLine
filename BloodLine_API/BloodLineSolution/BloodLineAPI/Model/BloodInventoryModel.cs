namespace BloodLineAPI.Model
{
    public class BloodInventoryModel
    {
        public string BloodGroup { get; set; }
        public int UnitsAvailable { get; set; }
        public DateTime LastUpdated { get; set; }
        public string BloodBankName { get; set; }
    }

}
