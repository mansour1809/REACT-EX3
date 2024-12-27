import  { useState, useEffect } from 'react';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import Profile from './Components/Profile.jsx';
import SystemAdmin from './Components/SystemAdmin.jsx';
import {  Routes,  Route, } from 'react-router-dom';
import useUsers from './Hooks/useUsers.jsx'

function App() {

  const{loadUsers} = useUsers();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(loadUsers())
    return () => sessionStorage.clear()

  }, []);

  // const handleLogout = () => {
  //   sessionStorage.removeItem('user');
  //   setUser(null);
  // };

  return (
    <>
    <Routes>
    <Route path="/" element={<Login users={users} />}></Route>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/systemAdmin" element={<SystemAdmin/>}></Route>
    </Routes>
    </>
  );
}

export default App;