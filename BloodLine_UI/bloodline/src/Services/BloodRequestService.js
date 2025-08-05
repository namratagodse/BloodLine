import axios from "axios";

const API_BASE_URL = "http://localhost:7282/api/BloodRequest";

export const getRequestsByStatus = async (status) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getbystatuswithuser/${status}`);
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
