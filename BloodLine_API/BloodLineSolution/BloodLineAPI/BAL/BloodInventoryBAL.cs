using BloodLineAPI.Model;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace BloodLineAPI.BAL
{
    public class BloodInventoryBAL
    {
        private readonly string _connectionString;

        public BloodInventoryBAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public bool AddToInventory(int donationId)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_AddToBloodInventory", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@DonationID", donationId);

                    try
                    {
                        con.Open();
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }
                }
            }
        }

        public List<BloodInventoryModel> GetInventoryByBloodBankId(int bloodBankId)
        {
            List<BloodInventoryModel> list = new List<BloodInventoryModel>();

            using (SqlConnection con = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_GetBloodInventoryByBloodBankId", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@BloodBankID", bloodBankId);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    list.Add(new BloodInventoryModel
                    {
                        BloodGroup = reader["BloodGroup"].ToString(),
                        UnitsAvailable = Convert.ToInt32(reader["UnitsAvailable"]),
                        LastUpdated = Convert.ToDateTime(reader["LastUpdated"]),
                        BloodBankName = reader["BloodBankName"].ToString()
                    });
                }
                reader.Close();
            }

            return list;
        }
    }
}
