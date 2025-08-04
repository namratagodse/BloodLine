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
                    SubmittedAt = Convert.ToDateTime(reader["SubmittedAt"]),
                    FullName = reader["FullName"]?.ToString(),   
                    Role = reader["Role"]?.ToString()            
                });
            }

            return Ok(feedbackList);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteFeedback(int id)
        {
            using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            using SqlCommand cmd = new SqlCommand("Feedback_CRUD", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Action", "DELETE");
            cmd.Parameters.AddWithValue("@FeedbackID", id);

            con.Open();
            int rowsAffected = cmd.ExecuteNonQuery();

            if (rowsAffected > 0)
                return Ok(new { message = "Feedback deleted (soft) successfully." });
            else
                return NotFound(new { message = "Feedback not found." });
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateFeedback([FromBody] FeedbackModel model)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                using SqlCommand cmd = new SqlCommand("Feedback_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "UPDATE");
                cmd.Parameters.AddWithValue("@FeedbackID", model.FeedbackID);
                cmd.Parameters.AddWithValue("@FeedbackText", model.FeedbackText);
                cmd.Parameters.AddWithValue("@Rating", model.Rating);

                con.Open();
                cmd.ExecuteNonQuery();

                return Ok(new { message = "Feedback updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating feedback", error = ex.Message });
            }
        }

    }
}
