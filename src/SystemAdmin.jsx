// SystemAdmin.jsx
import React, { useState, useEffect } from 'react';

function SystemAdmin({ onLogout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersFromStorage = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(usersFromStorage);
  }, []);

  const handleDelete = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {users.map(user => (
          <li key={user.email}>
            {user.username} - {user.email}
            <button onClick={() => handleDelete(user.email)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default SystemAdmin;