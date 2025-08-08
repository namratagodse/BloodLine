using BloodLineAPI.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace BloodLineAPI.BAL
{
    public class UserBAL
    {
        private readonly string _connectionString;

        public UserBAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        /// <summary>
        /// Registers or updates a user via stored procedure sp_ManageUserMaster.
        /// </summary>
        public void RegisterUser(UserModel user)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_ManageUserMaster", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@Action", user.Action);
            cmd.Parameters.AddWithValue("@UserID", user.UserID ?? (object)DBNull.Value);
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
            cmd.Parameters.AddWithValue("@AadhaarNumber", user.AadhaarNumber ?? (object)DBNull.Value);

            conn.Open();
            cmd.ExecuteNonQuery();
        }

        /// <summary>
        /// Look up a user by their plain-text email (for login).
        /// </summary>
        public UserModel GetByEmail(string email)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(@"
                SELECT TOP 1
                    [UserID], [FullName], [Email], [PasswordHash],
                    [PhoneNumber], [Gender], [DateOfBirth], [BloodGroup],
                    [Address], [City], [District], [State],
                    [Pincode], [Role], [IsActive], [AadhaarNumber]
                  FROM [dbo].[UserMaster]
                 WHERE [Email] = @Email", conn)
            {
                CommandType = CommandType.Text
            };

            cmd.Parameters.AddWithValue("@Email", email);
            conn.Open();

            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    FullName = reader["FullName"].ToString(),
                    Email = reader["Email"].ToString(),
                    PasswordHash = reader["PasswordHash"].ToString(),
                    PhoneNumber = reader["PhoneNumber"]?.ToString(),
                    Gender = reader["Gender"]?.ToString(),
                    DateOfBirth = reader["DateOfBirth"] != DBNull.Value
                                      ? Convert.ToDateTime(reader["DateOfBirth"])
                                      : (DateTime?)null,
                    BloodGroup = reader["BloodGroup"]?.ToString(),
                    Address = reader["Address"]?.ToString(),
                    City = reader["City"]?.ToString(),
                    District = reader["District"]?.ToString(),
                    State = reader["State"]?.ToString(),
                    Pincode = reader["Pincode"]?.ToString(),
                    Role = reader["Role"]?.ToString(),
                    IsActive = reader["IsActive"] != DBNull.Value
                                      && Convert.ToBoolean(reader["IsActive"]),
                    AadhaarNumber = reader["AadhaarNumber"]?.ToString()
                };
            }

            return null!;
        }

        // ── LEGACY LOGIN (unused by controller) ─────────────────────────
        public UserModel LoginUser(string email, string passwordHash)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_LoginUser", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@PasswordHash", passwordHash);

            conn.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    FullName = reader["FullName"].ToString(),
                    Email = reader["Email"].ToString(),
                    Role = reader["Role"].ToString(),
                    IsActive = true
                };
            }
            return null!;
        }

        /// <summary>
        /// Retrieves all donors via stored procedure.
        /// </summary>
        public List<UserModel> GetAllDonors()
        {
            var donors = new List<UserModel>();
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_ManageUserMaster", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@Action", "GET_ALL_DONORS");

            conn.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                donors.Add(new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    FullName = reader["FullName"].ToString(),
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"]?.ToString(),
                    Gender = reader["Gender"]?.ToString(),
                    DateOfBirth = reader["DateOfBirth"] != DBNull.Value
                                      ? Convert.ToDateTime(reader["DateOfBirth"])
                                      : (DateTime?)null,
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
            return donors;
        }

        /// <summary>
        /// Retrieves all receivers via stored procedure.
        /// </summary>
        public List<UserModel> GetAllReceivers()
        {
            var receivers = new List<UserModel>();
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_ManageUserMaster", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@Action", "GET_ALL_RECEIVERS");

            conn.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                receivers.Add(new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    FullName = reader["FullName"].ToString(),
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"]?.ToString(),
                    Gender = reader["Gender"]?.ToString(),
                    DateOfBirth = reader["DateOfBirth"] != DBNull.Value
                                      ? Convert.ToDateTime(reader["DateOfBirth"])
                                      : (DateTime?)null,
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
            return receivers;
        }

        /// <summary>
        /// Retrieves all blood banks via stored procedure.
        /// </summary>
        public List<UserModel> GetAllBloodBanks()
        {
            var banks = new List<UserModel>();
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_ManageUserMaster", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@Action", "GET_ALL_BLOODBANKS");

            conn.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                banks.Add(new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    FullName = reader["FullName"].ToString(),
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"]?.ToString(),
                    Gender = reader["Gender"]?.ToString(),
                    DateOfBirth = reader["DateOfBirth"] != DBNull.Value
                                      ? Convert.ToDateTime(reader["DateOfBirth"])
                                      : (DateTime?)null,
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
            return banks;
        }

        /// <summary>
        /// Updates a user via stored procedure.
        /// </summary>
        public string UpdateUser(UserModel user)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_ManageUserMaster", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

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

            conn.Open();
            var result = cmd.ExecuteScalar();
            return result?.ToString() ?? "User updated successfully.";
        }

        /// <summary>
        /// Deletes a user via stored procedure.
        /// </summary>
        public string DeleteUser(int userId)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_ManageUserMaster", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@Action", "DELETE");
            cmd.Parameters.AddWithValue("@UserID", userId);

            conn.Open();
            var result = cmd.ExecuteScalar();
            return result?.ToString() ?? "User deleted successfully.";
        }

        /// <summary>
        /// Toggles a user’s active status via stored procedure.
        /// </summary>
        public string ToggleUserStatus(int userId, bool isActive)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_ManageUserMaster", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@Action", "TOGGLE_STATUS");
            cmd.Parameters.AddWithValue("@UserID", userId);
            cmd.Parameters.AddWithValue("@IsActive", isActive);

            conn.Open();
            cmd.ExecuteNonQuery();
            return "Status toggled successfully.";
        }

        /// <summary>
        /// Retrieves a single user by ID via stored procedure.
        /// </summary>
        public UserModel GetUserById(int userId)
        {
            UserModel user = null;
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_ManageUserMaster", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@Action", "GET_BY_ID");
            cmd.Parameters.AddWithValue("@UserID", userId);

            conn.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                user = new UserModel
                {
                    UserID = Convert.ToInt32(reader["UserID"]),
                    FullName = reader["FullName"].ToString(),
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"] != DBNull.Value
                                      ? reader["PhoneNumber"].ToString()
                                      : null,
                    Gender = reader["Gender"] != DBNull.Value
                                      ? reader["Gender"].ToString()
                                      : null,
                    DateOfBirth = reader["DateOfBirth"] != DBNull.Value
                                      ? Convert.ToDateTime(reader["DateOfBirth"])
                                      : (DateTime?)null,
                    BloodGroup = reader["BloodGroup"]?.ToString(),
                    Address = reader["Address"]?.ToString(),
                    City = reader["City"]?.ToString(),
                    District = reader["District"]?.ToString(),
                    State = reader["State"]?.ToString(),
                    Pincode = reader["Pincode"]?.ToString(),
                    IsActive = reader["IsActive"] != DBNull.Value
                                      && Convert.ToBoolean(reader["IsActive"]),
                    AadhaarNumber = reader["AadhaarNumber"]?.ToString()
                };
            }

            return user;
        }

        /// <summary>
        /// Retrieves admin dashboard counts via stored procedure.
        /// </summary>
        public DashboardStatsModel GetAdminDashboardCounts()
        {
            var stats = new DashboardStatsModel();
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_GetAdminDashboardCounts", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            conn.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                stats.DonorCount = Convert.ToInt32(reader["DonorCount"]);
                stats.ReceiverCount = Convert.ToInt32(reader["ReceiverCount"]);
                stats.BloodBankCount = Convert.ToInt32(reader["BloodBankCount"]);
                stats.FeedbackCount = Convert.ToInt32(reader["FeedbackCount"]);
            }

            return stats;
        }

        /// <summary>
        /// Retrieves blood banks filtered by district via stored procedure.
        /// </summary>
        public List<UserModel> GetBloodBanksByDistrict(string districtName)
        {
            var bloodBanks = new List<UserModel>();
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("sp_GetBloodBanksByDistrict", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@DistrictName", districtName);

            conn.Open();
            using var reader = cmd.ExecuteReader();
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

            return bloodBanks;
        }
    }
}
