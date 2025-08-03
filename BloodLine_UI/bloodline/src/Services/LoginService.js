// src/services/userService.js
import axios from "axios";

const API_BASE_URL = "https://localhost:7282/api/user"; // update if needed

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    // Assuming the backend returns: { token: "..." }
    return response.data;

  } catch (error) {
    // Extract the error message if available
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.title || // .NET returns "title" for validation failures sometimes
      "Login failed";

    throw errorMsg;
  }
};
