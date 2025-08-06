import axios from "axios";

const BASE_URL = "https://localhost:7282/api/Location";

export const getAllStates = async () => {
  const res = await axios.get(`${BASE_URL}/states`);
  return res.data;
};

export const getDistrictsByState = async (stateId) => {
  const res = await axios.get(`${BASE_URL}/districts/${stateId}`);
  return res.data;
};

export const getBloodBanksByDistrict = async (districtName) => {
  const res = await axios.get(`https://localhost:7282/api/User/GetBloodBanksByDistrict/${districtName}`);
  return res.data;
};

