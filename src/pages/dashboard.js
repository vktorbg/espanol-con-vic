import React from 'react';
import { navigate } from 'gatsby';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome to Your Dashboard</h1>
        {user ? (
          <>
            <p>Logged in as: <strong>{user.email}</strong></p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
