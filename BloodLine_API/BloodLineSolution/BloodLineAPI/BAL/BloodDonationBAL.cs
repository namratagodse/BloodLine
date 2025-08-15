using System.Data;
using System.Data.SqlClient;
using BloodLineAPI.Model;
using Microsoft.Extensions.Configuration;

namespace BloodLineAPI.BAL
{
    public class BloodDonationBAL
    {
        private readonly string _connectionString;

        public BloodDonationBAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public bool InsertDonation(BloodDonationModel model)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_InsertDonation", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DonorID", model.DonorID);
                cmd.Parameters.AddWithValue("@BloodBankID", model.BloodBankID);
                cmd.Parameters.AddWithValue("@BloodGroup", model.BloodGroup);
                cmd.Parameters.AddWithValue("@UnitsDonated", model.UnitsDonated);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                return rowsAffected > 0;
            }
        }

        public List<BloodDonationModel> GetDonationsByDonor(int donorId)
        {
            List<BloodDonationModel> donations = new List<BloodDonationModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_GetDonationsByDonor", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DonorID", donorId);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    donations.Add(new BloodDonationModel
                    {
                        DonationID = Convert.ToInt32(reader["DonationID"]),
                        DonorID = Convert.ToInt32(reader["DonorID"]),
                        BloodBankID = Convert.ToInt32(reader["BloodBankID"]),
                        BloodGroup = reader["BloodGroup"].ToString(),
                        UnitsDonated = Convert.ToInt32(reader["UnitsDonated"]),
                        DonationDate = Convert.ToDateTime(reader["DonationDate"])
                    });
                }
            }

            return donations;
        }

        public List<BloodDonationModel> GetDonationsByDonorId(int donorId)
        {
            List<BloodDonationModel> donations = new List<BloodDonationModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_GetDonationsByDonorId", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DonorID", donorId);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    donations.Add(new BloodDonationModel
                    {
                        DonationID = reader.GetInt32(reader.GetOrdinal("DonationID")),
                        DonorID = reader.GetInt32(reader.GetOrdinal("DonorID")),
                        BloodBankID = reader.GetInt32(reader.GetOrdinal("BloodBankID")),
                        BloodGroup = reader.GetString(reader.GetOrdinal("BloodGroup")),
                        UnitsDonated = reader.GetInt32(reader.GetOrdinal("UnitsDonated")),
                        DonationDate = reader.IsDBNull(reader.GetOrdinal("DonationDate"))
                                        ? null
                                        : reader.GetDateTime(reader.GetOrdinal("DonationDate")),
                        NextDonationDate = reader.IsDBNull(reader.GetOrdinal("NextDonationDate"))
                                        ? null
                                        : reader.GetDateTime(reader.GetOrdinal("NextDonationDate")),
                        BloodBankName = reader["BloodBankName"].ToString() 

                    });
                }
            }

            return donations;
        }

        public List<BloodDonationModel> GetDonationsByBloodBankId(int bloodBankId)
        {
            List<BloodDonationModel> donations = new List<BloodDonationModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_GetDonationByBloodBankId", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@BloodBankID", bloodBankId);

                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        donations.Add(new BloodDonationModel
                        {
                            DonationID = Convert.ToInt32(reader["DonationID"]),
                            DonorID = Convert.ToInt32(reader["DonorID"]),
                            DonorName = reader["DonorName"].ToString(),
                            BloodBankID = Convert.ToInt32(reader["BloodBankID"]),
                            BloodBankName = reader["BloodBankName"].ToString(),
                            BloodGroup = reader["BloodGroup"].ToString(),
                            Gender = reader["Gender"] != DBNull.Value ? reader["Gender"].ToString() : null,
                            UnitsDonated = Convert.ToInt32(reader["UnitsDonated"]),
                            DonationDate = Convert.ToDateTime(reader["DonationDate"]),
                            NextDonationDate = reader["NextDonationDate"] != DBNull.Value ? (DateTime?)Convert.ToDateTime(reader["NextDonationDate"]) : null,
                            IsAddedToInventory = reader["IsAddedToInventory"] != DBNull.Value ? Convert.ToBoolean(reader["IsAddedToInventory"]) : (bool?)null
                        });
                    }
                }
            }

            return donations;
        }
    }
}
