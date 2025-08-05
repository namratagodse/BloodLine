using BloodLineAPI.Model;
using System.Data;
using Microsoft.Data.SqlClient;

namespace BloodLineAPI.BAL
{
    public class BloodRequestBAL
    {
        private readonly string _connectionString;

        public BloodRequestBAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public List<BloodRequestModel> GetRequestsByStatusWithUser(string status)
        {
            List<BloodRequestModel> list = new List<BloodRequestModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_BloodRequest_CRUD", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETBYSTATUSWITHUSER");
                cmd.Parameters.AddWithValue("@Status", status);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    list.Add(new BloodRequestModel
                    {
                        RequestId = Convert.ToInt32(reader["RequestId"]),
                        RequesterId = Convert.ToInt32(reader["RequesterId"]),
                        RequesterName = reader["RequesterName"].ToString(),
                        BloodGroup = reader["BloodGroup"].ToString(),
                        UnitsRequired = Convert.ToInt32(reader["UnitsRequired"]),
                        RequiredDate = Convert.ToDateTime(reader["RequiredDate"]),
                        Reason = reader["Reason"].ToString(),
                        Status = reader["Status"].ToString(),
                        CreatedAt = Convert.ToDateTime(reader["CreatedAt"])
                    });
                }
                conn.Close();
            }

            return list;
        }

    }
}
