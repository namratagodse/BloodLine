namespace BloodLineAPI.Model
{
    public class BloodRequestCountModel
    {
        public int Total { get; set; }
        public int Pending { get; set; }
        public int Approved { get; set; }
        public int Rejected { get; set; }
    }
}
