// src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import CustomNavbar from './components/NavBar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import MainContent from './pages/Home/MainContent';
import DonationInfo from './pages/Home/DonationInfo';
import SliderCards from './pages/Home/SliderCards';
import DonationSteps from './pages/Home/DonationSteps';
import Register from './pages/Register';
import AboutBloodDonation from './pages/AboutBloodDonation';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard'; 
import FeedbackPage from './pages/Feedback';
import Unauthorized from './components/Unauthorized';
import AddUser from './pages/Admin/AddUser';
import DonorsList from './pages/Admin/DonorList';
import ReceiverList from './pages/Admin/ReceiverList';
import BloodBankList from './pages/Admin/BloodBanksList';
import FeedbackList from './pages/Admin/FeedbackList';
import BloodBankDashboard from './pages/BloodBank/BloodBankDashboard';
import BloodBankNavbar from './pages/BloodBank/BloodBankNavbar';
import RejectedRequest from './pages/BloodBank/RejectedRequest';

function App() {
  const location = useLocation();

  // Hide Navbar & Footer only on Admin Dashboard
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isBloodBankRoute = location.pathname.startsWith('/bloodbank');

  return (
    <>
      {!isAdminRoute && !isBloodBankRoute && <CustomNavbar />}
      {isBloodBankRoute && <BloodBankNavbar />}

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

        {/* Admin Dashboard - protected for Admins only */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <AdminDashboard
                stats={{
                  feedbackCount: 0,
                  donorCount: 0,
                  receiverCount: 0,
                  bloodBankCount: 0,
                  bloodInventoryCount: 0,
                }}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-adduser"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <AddUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-alldonors"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <DonorsList/>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-allreceivers"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <ReceiverList/>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-allbloodbanks"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <BloodBankList/>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-allfeedbacks"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <FeedbackList/>
            </PrivateRoute>
          }
        />

        <Route
          path="/bloodbank-dashboard"
          element={
            <PrivateRoute allowedRoles={['BloodBank']}>
              <BloodBankDashboard/>
            </PrivateRoute>
          }
        />

        <Route
        path="/bloodbank-requests"
        element={
          <PrivateRoute allowedRoles={['BloodBank']}>
            <RejectedRequest />
          </PrivateRoute>
        }
      />


        {/* Unauthorized Access */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Feedback - for any logged-in user */}
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <FeedbackPage />
            </PrivateRoute>
          }
        />
      </Routes>

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

      {!isAdminRoute && !isBloodBankRoute && <Footer />}
    </>
  );
}

export default App;
