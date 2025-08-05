import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import { getAdminDashboardCounts } from '../../Services/AdminDashboardService';

function AdminHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminDashboardCounts();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading admin dashboard...</p>;

  return <AdminDashboard stats={stats} />;
}

export default AdminHome;
