using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using BloodLineAPI.Models;
using Microsoft.Extensions.Configuration;

namespace BloodLineAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FeedbackController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Authorize]
        public IActionResult SubmitFeedback([FromBody] FeedbackModel feedback)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                using SqlCommand cmd = new SqlCommand("Feedback_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "INSERT");
                cmd.Parameters.AddWithValue("@UserID", feedback.UserID);
                cmd.Parameters.AddWithValue("@FeedbackText", feedback.FeedbackText);
                cmd.Parameters.AddWithValue("@Rating", feedback.Rating);

                con.Open();
                cmd.ExecuteNonQuery();

                return Ok(new { message = "Feedback submitted successfully." });
            }
            catch
            {
                return BadRequest(new { message = "Something went wrong while submitting feedback." });
            }
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllFeedback()
        {
            var feedbackList = new List<FeedbackModel>();

            using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            using SqlCommand cmd = new SqlCommand("Feedback_CRUD", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Action", "GETALL");

            con.Open();
            using SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                feedbackList.Add(new FeedbackModel
                {
                    FeedbackID = Convert.ToInt32(reader["FeedbackID"]),
                    UserID = Convert.ToInt32(reader["UserID"]),
                    FeedbackText = reader["FeedbackText"].ToString(),
                    Rating = Convert.ToInt32(reader["Rating"]),
                    SubmittedAt = Convert.ToDateTime(reader["SubmittedAt"])
                });
            }

            return Ok(feedbackList);
        }
    }
}
