import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import DonationRequests from '../DonationRequests';
// ...existing code...
// import axios from 'axios'; // Temporarily remove

function AdminHome() {
  
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // ✅ Simulate API response with dummy data
    const mockStats = {
      feedbackCount: 10,
      donorCount: 25,
      receiverCount: 15,
      bloodBankCount: 4,
      bloodInventoryCount: 200
    };

    // Simulate network delay
    setTimeout(() => {
      setStats(mockStats);
    }, 500); // 0.5 second delay
  }, []);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  if (!stats) return <p className="text-center mt-5">Loading admin dashboard...</p>;

  return (
    <div>
      <AdminDashboard stats={stats} onLogout={handleLogout} />
      {/* Render Donation Requests below the dashboard */}
      <DonationRequests />
    </div>
  );
}

export default AdminHome;
