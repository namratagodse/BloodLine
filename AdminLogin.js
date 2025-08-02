import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name === 'IET' && password === 'IET@2025') {
      navigate('/admin-dashboard');
    } else {
      setError('Invalid admin credentials.');
    }
  };

 return (
  <div className="container my-5">
    <h2 className="text-center mb-4" style={{ paddingTop: '40px' }}>Admin Login</h2>
    <form className="mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleLogin}>
      <div className="mb-3">
        <label className="form-label">Admin Name</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <div className="text-danger mb-3">{error}</div>}
      <button className="btn btn-danger w-100">Login</button>
    </form>
  </div>
);
};

export default AdminLogin;
