import  { useState, useEffect } from 'react';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import Profile from './Components/Profile.jsx';
import SystemAdmin from './Components/SystemAdmin.jsx';
import {  Routes,  Route, } from 'react-router-dom';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(loadUsers())
    return () => sessionStorage.clear() // clear the session storage whenever route to the home page(login)
  }, []);

  const loadUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];// parse it to an array if there is data in local storage , else empty array
  };
  return (
    <> 
    <Routes>
    <Route path="/" element={<Login users={users} />}></Route>
    <Route path="/register" element={<Register users={users}/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/systemAdmin" element={<SystemAdmin/>}></Route>
    </Routes>
    </>
  );
}

export default App;