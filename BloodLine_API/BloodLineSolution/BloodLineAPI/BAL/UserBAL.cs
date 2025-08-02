using BloodLineAPI.Model;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace BloodLine_Backend.BAL
{
    public class UserBAL
    {
        private readonly string _connectionString;

        public UserBAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public void RegisterUser(UserModel user)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", user.Action);
                cmd.Parameters.AddWithValue("@UserID", DBNull.Value);
                cmd.Parameters.AddWithValue("@FullName", user.FullName ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Email", user.Email ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@PasswordHash", user.PasswordHash ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNumber ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Gender", user.Gender ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@DateOfBirth", user.DateOfBirth ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@BloodGroup", user.BloodGroup ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Address", user.Address ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@City", user.City ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@District", user.District ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@State", user.State ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Pincode", user.Pincode ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Role", user.Role ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@IsActive", user.IsActive ?? (object)DBNull.Value);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
