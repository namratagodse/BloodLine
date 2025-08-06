import axios from "axios";

const API_BASE_URL = "https://localhost:7282/api/BloodRequest";

export const getRequestsByStatus = async (status, bloodBankId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_BASE_URL}/getbystatuswithuser`,
      {
        action: "GETBYSTATUSWITHUSER",
        status: status,
        bloodBankId: bloodBankId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    throw error;
  }
};


export const updateRequestStatus = async (requestId, status) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${API_BASE_URL}/updatestatus`,
      {
        requestId: requestId,
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating request status:", error);
    throw error;
  }
};

export const getAllRequestsWithUser = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/getallwithuser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAvailableBloodBanks = async (districtName, bloodGroup, unitsRequired) => {
  try {
    const response = await axios.get("https://localhost:7282/api/BloodRequest/GetAvailableBloodBanks", {
      params: {
        district: districtName,
        bloodGroup: bloodGroup,
        unitsRequired: unitsRequired,
      },
      headers: {
        "Content-Type": "application/json",
        // add authorization if needed:
        // Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching available blood banks:", error.response?.data || error.message);
    throw error;
  }
};



export const submitBloodRequest = (data) => {
  return axios.post("https://localhost:7282/api/BloodRequest", data);
};