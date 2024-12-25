// Profile.jsx
import React from 'react';

function Profile({ user, onLogout }) {
  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Profile;