// src/components/BloodBankNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BloodBankNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#9B1C2E', padding: '1rem', color: 'white' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h4 style={{ margin: 0 }}>Blood Bank Dashboard</h4>
        <button 
          onClick={handleLogout} 
          style={{ 
            background: 'white', 
            color: '#dc3545', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '5px', 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default BloodBankNavbar;
