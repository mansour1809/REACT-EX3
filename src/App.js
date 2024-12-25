// App.js
import React, { useState, useEffect } from 'react';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import SystemAdmin from './SystemAdmin.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      {user ? (
        user.username === 'admin' ? (
          <SystemAdmin user={user} onLogout={handleLogout} />
        ) : (
          <Profile user={user} onLogout={handleLogout} />
        )
      ) : (
        <div>
          <Login onLogin={setUser} />
          <Register />
        </div>
      )}
    </div>
  );
}

export default App;
