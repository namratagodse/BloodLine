// src/services/userService.js
import axios from "axios";

const API_BASE_URL = "https://localhost:7282/api/user"; // update if different

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
