"use client";

import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome import
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import AddChildren from './pages/AddChild';
import ManageChildren from './pages/ManageChildren';
import AddVac from './pages/AddVac';
import ManageVac from './pages/ManageVac';
import Account from './pages/Account';
import ShotRecords from './pages/ShotRecords';
import LoginForm from './pages/LoginForm'; // Import the LoginForm component

import './styles/Sidebar.css';

const App: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  const handleLogin = (isLoggedIn: boolean) => {
    setIsAuthenticated(isLoggedIn); // Update auth state when login is successful
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Log out and set auth state to false
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  };

  // Prevent rendering of the app until it's client-side
  if (!isClient) {
    return null;
  }

  return (
    <Router>
      <Routes>
        {/* If not authenticated, show login page */}
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect all non-login routes to login */}
          </>
        ) : (
          // If authenticated, render protected routes
          <>
            <Route path="/home" element={<AdminLayout><Home /></AdminLayout>} />
            <Route path="/addchild" element={<AdminLayout><AddChildren /></AdminLayout>} />
            <Route path="/managechildren" element={<AdminLayout><ManageChildren /></AdminLayout>} />
            <Route path="/addvac" element={<AdminLayout><AddVac /></AdminLayout>} />
            <Route path="/managevac" element={<AdminLayout><ManageVac /></AdminLayout>} />
            <Route path="/shotrecords" element={<AdminLayout><ShotRecords /></AdminLayout>} />
            <Route path="/account" element={<AdminLayout><Account /></AdminLayout>} />
            <Route path="*" element={<Navigate to="/home" replace />} /> {/* Default redirect to home */}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
