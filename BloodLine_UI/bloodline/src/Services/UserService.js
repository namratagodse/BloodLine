// src/Services/UserService.js
import axios from "axios";

const API_BASE_URL = "https://localhost:7282/api/User";

// Existing
export const getAllDonors = async () => {
  const response = await axios.get(`${API_BASE_URL}/GetAllDonors`);
  return response.data;
};

export const getAllReceivers = async () => {
  const response = await axios.get(`${API_BASE_URL}/GetAllReceivers`);
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
