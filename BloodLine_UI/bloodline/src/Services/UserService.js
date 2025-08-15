// src/Services/UserService.js
import axios from "axios";

const API_BASE_URL = "https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net";


// Existing
export const getAllDonors = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/User/GetAllDonors`);
  return response.data;
};

export const getAllReceivers = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/User/GetAllReceivers`);
  return response.data;
};

export const getAllBloodBanks = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/User/GetAllBloodBanks`);
  return response.data;
};

export const getAllFeedbacks = async () => {
  const token = localStorage.getItem("token"); 
  const response = await axios.get("https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/feedback/all", {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};

export const deleteFeedback = async (feedbackID) => {
  const token = localStorage.getItem("token"); // Get JWT token

  const response = await axios.delete(
    `https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/Feedback/${feedbackID}`,
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
  const response = await axios.put(`https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/Feedback/`, feedback, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// ✅ Add this for toggle status
export const toggleUserStatus = async (userId) => {
  const response = await axios.post(`https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/User/ToggleUserStatus/${userId}`);
  return response.data;
};


// ✅ Add this for delete
export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_BASE_URL}/api/User/DeleteUser/${userId}`);
  return response.data;
};

// ✅ Add this for update
export const updateUser = async (user) => {
  const response = await axios.put(`${API_BASE_URL}/api/User/UpdateUser`, user);
  return response.data;
};
