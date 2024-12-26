import  { useState, useEffect } from 'react';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import Profile from './Components/Profile.jsx';
import SystemAdmin from './Components/SystemAdmin.jsx';
import { BrowserRouter, Routes,  Route, Link } from 'react-router-dom';

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
    <>
    <nav>
      <button><Link to="/">Login</Link></button>
      <button><Link to="/register">register</Link></button>
      <button><Link to="/profile">profile</Link></button>
      <button><Link to="/systemAdmin">systemAdmin</Link></button>
      <button><Link to="/systemAdmin">systemAdmin</Link></button>
    </nav>
    
    <Routes>
    {/* <Route path="/" element={}></Route> */}
    <Route path="/" element={<Login/>}></Route>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/systemAdmin" element={<SystemAdmin/>}></Route>
    </Routes>
    </>
  );
}

export default App;