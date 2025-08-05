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
  const response = await axios.get(`${API_URL}/getallwithuser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
