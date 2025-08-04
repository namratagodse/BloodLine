using BloodLineAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace BloodLineAPI.BAL
{
    public class FeedbackBAL
    {
        private readonly string _connectionString;

        public FeedbackBAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public bool AddFeedback(FeedbackModel model)
        {
            using SqlConnection conn = new SqlConnection(_connectionString);
            using SqlCommand cmd = new SqlCommand("Feedback_CRUD", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@Action", model.Action);
            cmd.Parameters.AddWithValue("@UserID", model.UserID);
            cmd.Parameters.AddWithValue("@FeedbackText", model.FeedbackText ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@Rating", model.Rating);
            cmd.Parameters.AddWithValue("@FeedbackID", DBNull.Value);

            conn.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0;
        }

        
    }
}
