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

        public List<FeedbackModel> GetAllFeedbacks(string? role)
        {
            List<FeedbackModel> list = new List<FeedbackModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("Feedback_CRUD", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "GETALL");
                cmd.Parameters.AddWithValue("@Role", string.IsNullOrEmpty(role) ? DBNull.Value : (object)role);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    FeedbackModel feedback = new FeedbackModel
                    {
                        FeedbackID = Convert.ToInt32(reader["FeedbackID"]),
                        UserID = Convert.ToInt32(reader["UserID"]),
                        FullName = reader["FullName"].ToString(),
                        Role = reader["Role"].ToString(),
                        FeedbackText = reader["FeedbackText"].ToString(),
                        Rating = Convert.ToInt32(reader["Rating"]),
                        SubmittedAt = Convert.ToDateTime(reader["SubmittedAt"])
                    };

                    list.Add(feedback);
                }

                conn.Close();
            }

            return list;
        }

    }
}
