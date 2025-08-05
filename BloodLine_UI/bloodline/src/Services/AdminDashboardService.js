import axios from 'axios';

const BASE_URL = 'https://localhost:7282/api';

export const getAdminDashboardCounts = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${BASE_URL}/User/admindashboardcounts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
