using System;

namespace BloodLineAPI.Models
{
    public class FeedbackModel
    {
        public int? FeedbackID { get; set; }
        public int UserID { get; set; }
        public string FeedbackText { get; set; }
        public int Rating { get; set; }
        public DateTime? SubmittedAt { get; set; }  
        public string Action { get; set; }
    }
}
