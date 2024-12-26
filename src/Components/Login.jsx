// Login.jsx
import  { useState } from 'react';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import Register from './Register';

function Login(  ) {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
  const handleChange = (name,e) => {
if (name === 'password') {
  setPassword(e.target.value)
}
else
setUsername(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
      // props.onLogin(user);
      console.log('hello world');
      <Profile/>
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={(e)=> handleChange("username" , e)} required />
      <input type="password" name="password" placeholder="Password" onChange={(e)=> handleChange("password" , e)} required />
      <span id='ErrorMsg'></span>
      <button type="submit">Login</button><br /><br />
      Don't have an account? <Link to="/register">Sign Up</Link>
  
    </form>
  );
}

export default Login;