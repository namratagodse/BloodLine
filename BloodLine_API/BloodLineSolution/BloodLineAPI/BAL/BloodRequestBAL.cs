using BloodLineAPI.Model;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace BloodLineAPI.BAL
{
    public class BloodRequestBAL
    {
        private readonly string _connectionString;

        public BloodRequestBAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<BloodRequestModel> GetRequestsByStatusWithUser(string status, int? bloodBankId)
        {
            List<BloodRequestModel> list = new List<BloodRequestModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_BloodRequest_CRUD", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETBYSTATUSWITHUSER");
                cmd.Parameters.AddWithValue("@Status", status);
                cmd.Parameters.AddWithValue("@BloodBankId", bloodBankId);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    list.Add(new BloodRequestModel
                    {
                        RequestId = Convert.ToInt32(reader["RequestId"]),
                        RequesterId = Convert.ToInt32(reader["RequesterId"]),
                        RequesterName = reader["RequesterName"]?.ToString(),
                        BloodBankId = reader["BloodBankId"] != DBNull.Value ? Convert.ToInt32(reader["BloodBankId"]) : (int?)null,
                        BloodBankName = reader["BloodBankName"]?.ToString(),
                        BloodGroup = reader["BloodGroup"]?.ToString(),
                        UnitsRequired = Convert.ToInt32(reader["UnitsRequired"]),
                        RequiredDate = Convert.ToDateTime(reader["RequiredDate"]),
                        Reason = reader["Reason"]?.ToString(),
                        Status = reader["Status"]?.ToString(),
                        CreatedAt = reader["CreatedAt"] != DBNull.Value ? Convert.ToDateTime(reader["CreatedAt"]) : (DateTime?)null
                    });
            }
            conn.Close();
            }

            return list;
        }

        public string UpdateRequestStatus(UpdateRequestModel model)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_BloodRequest_CRUD", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Action", "UPDATESTATUS");
                cmd.Parameters.AddWithValue("@RequestId", model.RequestId);
                cmd.Parameters.AddWithValue("@Status", model.Status);

                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return "Status updated successfully.";
        }

        public List<BloodRequestModel> GetAllRequestsWithUser(int? bloodBankId)
        {
            List<BloodRequestModel> requests = new List<BloodRequestModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand("sp_BloodRequest_CRUD", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GETALLWITHUSER");
                cmd.Parameters.AddWithValue("@BloodBankId", bloodBankId);

                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        requests.Add(new BloodRequestModel
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
                }
            }

            return requests;
        }

        public BloodRequestCountModel GetRequestCounts(int? bloodBankId)
        {
            BloodRequestCountModel counts = new BloodRequestCountModel();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_BloodRequest_CRUD", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GET_REQUEST_COUNTS");
                cmd.Parameters.AddWithValue("@BloodBankId", bloodBankId);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    counts.Total = Convert.ToInt32(reader["TotalRequests"]);
                    counts.Pending = Convert.ToInt32(reader["PendingRequests"]);
                    counts.Approved = Convert.ToInt32(reader["ApprovedRequests"]);
                    counts.Rejected = Convert.ToInt32(reader["RejectedRequests"]);
                }
            }

            return counts;
        }

        public bool InsertBloodRequest(BloodRequestModel model)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_BloodRequest_CRUD", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Action", "INSERT");
                    cmd.Parameters.AddWithValue("@RequesterId", model.RequesterId);
                    cmd.Parameters.AddWithValue("@BloodBankId", model.BloodBankId ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@BloodGroup", model.BloodGroup ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@UnitsRequired", model.UnitsRequired);
                    cmd.Parameters.AddWithValue("@RequiredDate", model.RequiredDate);
                    cmd.Parameters.AddWithValue("@Reason", model.Reason ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@Status", model.Status ?? "Pending");

                    conn.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();

                    return rowsAffected > 0;
                }
            }
        }

        public List<AvailableBloodBankModel> GetAvailableBloodBanks(string district, string bloodGroup, int unitsRequired)
        {
            List<AvailableBloodBankModel> banks = new List<AvailableBloodBankModel>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetAvailableBloodBanks", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@District", district);
                    cmd.Parameters.AddWithValue("@BloodGroup", bloodGroup);
                    cmd.Parameters.AddWithValue("@UnitsRequired", unitsRequired);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            banks.Add(new AvailableBloodBankModel
                            {
                                BloodBankId = Convert.ToInt32(reader["BloodBankId"]),
                                BloodBankName = reader["BloodBankName"].ToString(),
                                District = reader["District"].ToString(),
                                BloodGroup = reader["BloodGroup"].ToString(),
                                UnitsAvailable = Convert.ToInt32(reader["UnitsAvailable"])
                            });
                        }
                    }
                }
            }

            return banks;
        }

        public List<BloodRequestModel> GetAllBloodRequests()
        {
            List<BloodRequestModel> requests = new List<BloodRequestModel>();

            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_GetBloodRequestsWithDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    requests.Add(new BloodRequestModel
                    {
                        RequestId = Convert.ToInt32(dr["RequestId"]),
                        RequesterId = Convert.ToInt32(dr["RequesterId"]),
                        RequesterName = dr["RequesterName"].ToString(),
                        BloodBankId = dr["BloodBankId"] != DBNull.Value ? Convert.ToInt32(dr["BloodBankId"]) : null,
                        BloodBankName = dr["BloodBankName"].ToString(),
                        BloodGroup = dr["BloodGroup"].ToString(),
                        UnitsRequired = Convert.ToInt32(dr["UnitsRequired"]),
                        RequiredDate = Convert.ToDateTime(dr["RequiredDate"]),
                        Reason = dr["Reason"].ToString(),
                        Status = dr["Status"].ToString(),
                        CreatedAt = dr["CreatedAt"] != DBNull.Value ? Convert.ToDateTime(dr["CreatedAt"]) : null
                    });
                }
            }

            return requests;
        }

        public List<BloodRequestModel> GetRequestsByRequesterId(int requesterId)
        {
            List<BloodRequestModel> requests = new List<BloodRequestModel>();

            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("sp_GetBloodRequestsByRequester", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@RequesterId", requesterId);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    BloodRequestModel request = new BloodRequestModel
                    {
                        RequestId = Convert.ToInt32(reader["RequestId"]),
                        RequesterId = Convert.ToInt32(reader["RequesterId"]),
                        RequesterName = reader["RequesterName"].ToString(),
                        BloodBankId = Convert.ToInt32(reader["BloodBankId"]),
                        BloodBankName = reader["BloodBankName"].ToString(),
                        BloodGroup = reader["BloodGroup"].ToString(),
                        UnitsRequired = Convert.ToInt32(reader["UnitsRequired"]),
                        RequiredDate = Convert.ToDateTime(reader["RequiredDate"]),
                        Reason = reader["Reason"].ToString(),
                        Status = reader["Status"]?.ToString(),
                        CreatedAt = reader["CreatedAt"] == DBNull.Value ? null : (DateTime?)Convert.ToDateTime(reader["CreatedAt"])
                    };
                    requests.Add(request);
                }
            }

            return requests;
        }
    }
}
