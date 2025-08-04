// src/Services/UserService.js
import axios from "axios";

const API_BASE_URL = "https://localhost:7282/api/User";
const BASE_URL = "https://localhost:7282/api/Feedback";

// Existing
export const getAllDonors = async () => {
  const response = await axios.get(`${API_BASE_URL}/GetAllDonors`);
  return response.data;
};

export const getAllReceivers = async () => {
  const response = await axios.get(`${API_BASE_URL}/GetAllReceivers`);
  return response.data;
};

export const getAllBloodBanks = async () => {
  const response = await axios.get(`${API_BASE_URL}/GetAllBloodBanks`);
  return response.data;
};

export const getAllFeedbacks = async () => {
  const token = localStorage.getItem("token"); 
  const response = await axios.get("https://localhost:7282/api/feedback/all", {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};

export const deleteFeedback = async (feedbackID) => {
  const token = localStorage.getItem("token"); // Get JWT token

  const response = await axios.delete(
    `https://localhost:7282/api/Feedback/${feedbackID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Send token
      },
    }
  );

  return response.data;
};


export const updateFeedback = async (feedback) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${BASE_URL}`, feedback, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// ✅ Add this for toggle status
export const toggleUserStatus = async (userId) => {
  const response = await axios.post(`https://localhost:7282/api/User/ToggleUserStatus/${userId}`);
  return response.data;
};


// ✅ Add this for delete
export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_BASE_URL}/DeleteUser/${userId}`);
  return response.data;
};

// ✅ Add this for update
export const updateUser = async (user) => {
  const response = await axios.put(`${API_BASE_URL}/UpdateUser`, user);
  return response.data;
};
