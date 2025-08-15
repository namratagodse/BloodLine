// src/Services/DonationService.js
import axios from "axios";

const BASE_URL = "https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/BloodDonation";

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

export const getDonationsByDonorId = async (donorId) => {
  try {
    const response = await axios.get(`${BASE_URL}/GetDonationsByDonorId/${donorId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch Donations Error:", error);
    throw error;
  }
};

export const getDonationsByBloodBank = async (bloodBankId) => {
    return axios.get(`https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/BloodDonation/GetDonationsByBloodBank/${bloodBankId}`);
};

export const addToInventory = async (donationId) => {
    return axios.post(`https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/BloodInventory/AddDonationToInventory/${donationId}`);
};