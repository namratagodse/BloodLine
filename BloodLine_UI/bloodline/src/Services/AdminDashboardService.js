import axios from 'axios';

const BASE_URL = 'https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api';

export const getAdminDashboardCounts = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${BASE_URL}/User/admindashboardcounts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
