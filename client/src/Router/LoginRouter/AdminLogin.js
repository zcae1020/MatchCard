import React from 'react';
import Login from './Login';

function AdminLogin() {
  const userType = 'admin';
  return (
    <React.Fragment>
      <h1>Match Card Game - Admin</h1>
      <Login userType={userType} />
    </React.Fragment>
  );
}

export default AdminLogin;
