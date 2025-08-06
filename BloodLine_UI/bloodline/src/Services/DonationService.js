// src/Services/DonationService.js
import axios from "axios";

const BASE_URL = "https://localhost:7282/api/BloodDonation";

export const insertDonation = async (donationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/InsertDonation`, donationData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Insert Donation Error:", error);
    throw error;
  }
};
