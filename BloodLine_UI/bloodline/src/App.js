import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import CustomNavbar from './components/NavBar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'; // NEW
import MainContent from './pages/Home/MainContent';
import DonationInfo from './pages/Home/DonationInfo';
import SliderCards from './pages/Home/SliderCards';
import DonationSteps from './pages/Home/DonationSteps';
import Register from './pages/Register';
import AboutBloodDonation from './pages/AboutBloodDonation';
import Login from './pages/Login';
import AdminHome from './pages/Admin/AdminHome';
import FeedbackPage from './pages/Feedback'; // NEW

function App() {
  const location = useLocation();

  // Hide Navbar & Footer only on Admin Dashboard
  const isAdminRoute = location.pathname === '/admin-dashboard';

  return (
    <>
      {!isAdminRoute && <CustomNavbar />}

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <MainContent />
              <DonationInfo />
              <SliderCards />
              <DonationSteps />
            </>
          }
        />

        {/* Donor Registration */}
        <Route path="/register" element={<Register />} />

        {/* About Blood Donation */}
        <Route path="/about-blood-donation" element={<AboutBloodDonation />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminHome />} />

        {/* Feedback Page (Protected) */}
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <FeedbackPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
