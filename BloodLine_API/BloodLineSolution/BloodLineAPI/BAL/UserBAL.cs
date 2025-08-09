using BloodLineAPI.Model;
using BloodLineAPI.Utilities;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BloodLineAPI.BAL
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

                // Hash the password before sending to DB
                string hashedPassword = PasswordHelper.HashPassword(user.PasswordHash);

                cmd.Parameters.AddWithValue("@Action", user.Action);
                cmd.Parameters.AddWithValue("@UserID", DBNull.Value);
                cmd.Parameters.AddWithValue("@FullName", user.FullName ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Email", user.Email ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@PasswordHash", hashedPassword ?? (object)DBNull.Value);
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
                cmd.Parameters.AddWithValue("@AadhaarNumber", user.AadhaarNumber ?? (object)DBNull.Value);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        // New LoginUser method added
        public UserModel LoginUser(string email, string enteredPassword)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "GET_BY_EMAIL");
                cmd.Parameters.AddWithValue("@Email", email);

                conn.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        string storedHash = reader["PasswordHash"].ToString();

                        // Verify the entered password against the stored hash
                        if (PasswordHelper.VerifyPassword(enteredPassword, storedHash))
                        {
                            return new UserModel
                            {
                                UserID = Convert.ToInt32(reader["UserID"]),
                                FullName = reader["FullName"].ToString(),
                                Email = reader["Email"].ToString(),
                                Role = reader["Role"].ToString(),
                                IsActive = Convert.ToBoolean(reader["IsActive"])
                            };
                        }
                    }
                }
            }

            return null; // Invalid login
        }

        public List<UserModel> GetAllDonors()
        {
            List<UserModel> donors = new List<UserModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GET_ALL_DONORS");

                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        donors.Add(new UserModel
                        {
                            UserID = Convert.ToInt32(reader["UserID"]),
                            FullName = reader["FullName"].ToString(),
                            Email = reader["Email"].ToString(),
                            PhoneNumber = reader["PhoneNumber"]?.ToString(),
                            Gender = reader["Gender"]?.ToString(),
                            DateOfBirth = reader["DateOfBirth"] != DBNull.Value ? Convert.ToDateTime(reader["DateOfBirth"]) : null,
                            BloodGroup = reader["BloodGroup"]?.ToString(),
                            Address = reader["Address"]?.ToString(),
                            City = reader["City"]?.ToString(),
                            District = reader["District"]?.ToString(),
                            State = reader["State"]?.ToString(),
                            Pincode = reader["Pincode"]?.ToString(),
                            Role = reader["Role"]?.ToString(),
                            IsActive = Convert.ToBoolean(reader["IsActive"]),
                            AadhaarNumber = reader["AadhaarNumber"]?.ToString()

                        });
                    }
                }
            }

            return donors;
        }

        public List<UserModel> GetAllReceivers()
{
    List<UserModel> receivers = new List<UserModel>();

    using (SqlConnection conn = new SqlConnection(_connectionString))
    {
        SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", conn);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@Action", "GET_ALL_RECEIVERS");

        conn.Open();
        using (SqlDataReader reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                receivers.Add(new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    FullName = reader["FullName"].ToString(),
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"]?.ToString(),
                    Gender = reader["Gender"]?.ToString(),
                    DateOfBirth = reader["DateOfBirth"] != DBNull.Value ? Convert.ToDateTime(reader["DateOfBirth"]) : null,
                    BloodGroup = reader["BloodGroup"]?.ToString(),
                    Address = reader["Address"]?.ToString(),
                    City = reader["City"]?.ToString(),
                    District = reader["District"]?.ToString(),
                    State = reader["State"]?.ToString(),
                    Pincode = reader["Pincode"]?.ToString(),
                    Role = reader["Role"]?.ToString(),
                    IsActive = Convert.ToBoolean(reader["IsActive"]),
                    AadhaarNumber = reader["AadhaarNumber"]?.ToString()
                });
            }
        }
    }

    return receivers;
}

        public List<UserModel> GetAllBloodBanks()
        {
            List<UserModel> donors = new List<UserModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GET_ALL_BLOODBANKS");

                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        donors.Add(new UserModel
                        {
                            UserID = Convert.ToInt32(reader["UserID"]),
                            FullName = reader["FullName"].ToString(),
                            Email = reader["Email"].ToString(),
                            PhoneNumber = reader["PhoneNumber"]?.ToString(),
                            Gender = reader["Gender"]?.ToString(),
                            DateOfBirth = reader["DateOfBirth"] != DBNull.Value ? Convert.ToDateTime(reader["DateOfBirth"]) : null,
                            BloodGroup = reader["BloodGroup"]?.ToString(),
                            Address = reader["Address"]?.ToString(),
                            City = reader["City"]?.ToString(),
                            District = reader["District"]?.ToString(),
                            State = reader["State"]?.ToString(),
                            Pincode = reader["Pincode"]?.ToString(),
                            Role = reader["Role"]?.ToString(),
                            IsActive = Convert.ToBoolean(reader["IsActive"])
                        });
                    }
                }
            }

            return donors;
        }


        public string UpdateUser(UserModel user)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "UPDATE");
                cmd.Parameters.AddWithValue("@UserID", user.UserID);
                cmd.Parameters.AddWithValue("@FullName", user.FullName);
                cmd.Parameters.AddWithValue("@Email", user.Email);
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
                cmd.Parameters.AddWithValue("@IsActive", user.IsActive);
                cmd.Parameters.AddWithValue("@AadhaarNumber", user.AadhaarNumber ?? (object)DBNull.Value);

                con.Open();
                var result = cmd.ExecuteScalar();
                return result?.ToString() ?? "User updated successfully.";
            }
        }

        public string DeleteUser(int userId)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "DELETE");
                cmd.Parameters.AddWithValue("@UserID", userId);

                con.Open();
                var result = cmd.ExecuteScalar();
                return result?.ToString() ?? "User deleted successfully.";
            }
        }

        public string ToggleUserStatus(int userId, bool isActive)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "TOGGLE_STATUS");
                cmd.Parameters.AddWithValue("@UserID", userId);
                cmd.Parameters.AddWithValue("@IsActive", isActive);

                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
                return "Status toggled successfully.";
            }
        }

        public UserModel GetUserById(int userId)
        {
            UserModel user = null;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_ManageUserMaster", connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "GET_BY_ID");
                cmd.Parameters.AddWithValue("@UserID", userId);

                connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    user = new UserModel
                    {
                        UserID = Convert.ToInt32(reader["UserID"]),
                        FullName = reader["FullName"].ToString(),
                        Email = reader["Email"].ToString(),
                        PhoneNumber = reader["PhoneNumber"] != DBNull.Value ? reader["PhoneNumber"].ToString() : null,
                        Gender = reader["Gender"] != DBNull.Value ? reader["Gender"].ToString() : null,
                        DateOfBirth = reader["DateOfBirth"] != DBNull.Value ? Convert.ToDateTime(reader["DateOfBirth"]) : (DateTime?)null,
                        BloodGroup = reader["BloodGroup"] != DBNull.Value ? reader["BloodGroup"].ToString() : null,
                        Address = reader["Address"] != DBNull.Value ? reader["Address"].ToString() : null,
                        City = reader["City"] != DBNull.Value ? reader["City"].ToString() : null,
                        District = reader["District"] != DBNull.Value ? reader["District"].ToString() : null,
                        State = reader["State"] != DBNull.Value ? reader["State"].ToString() : null,
                        Pincode = reader["Pincode"] != DBNull.Value ? reader["Pincode"].ToString() : null,
                        IsActive = reader["IsActive"] != DBNull.Value && Convert.ToBoolean(reader["IsActive"]),
                        AadhaarNumber = reader["AadhaarNumber"] != DBNull.Value ? reader["AadhaarNumber"].ToString() : null
                    };
                }

                connection.Close();
            }

            return user;
        }

        public DashboardStatsModel GetAdminDashboardCounts()
        {
            DashboardStatsModel stats = new DashboardStatsModel();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_GetAdminDashboardCounts", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        stats.DonorCount = Convert.ToInt32(reader["DonorCount"]);
                        stats.ReceiverCount = Convert.ToInt32(reader["ReceiverCount"]);
                        stats.BloodBankCount = Convert.ToInt32(reader["BloodBankCount"]);
                        stats.FeedbackCount = Convert.ToInt32(reader["FeedbackCount"]);
                    }
                }
            }

            return stats;
        }

        public List<UserModel> GetBloodBanksByDistrict(string districtName)
        {
            List<UserModel> bloodBanks = new List<UserModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetBloodBanksByDistrict", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@DistrictName", districtName);

                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        bloodBanks.Add(new UserModel
                        {
                            UserID = Convert.ToInt32(reader["UserID"]),
                            FullName = reader["FullName"].ToString(),
                            Email = reader["Email"].ToString(),
                            PhoneNumber = reader["PhoneNumber"].ToString(),
                            Address = reader["Address"].ToString(),
                            State = reader["State"].ToString(),
                            District = reader["District"].ToString(),
                            City = reader["City"].ToString()
                        });
                    }
                }
            }

            return bloodBanks;
        }

    }
}
