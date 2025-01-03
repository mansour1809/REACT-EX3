// Profile.jsx
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect } from 'react';

function Profile() {
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user")
  
  useEffect(() => {
  if(!user)
    navigate("/");  
  })
  

  return (
    <>
    <NavBar/>
    <div>
      hello to the profile page``
      {/* <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <button onClick={onLogout}>Logout</button> */}
    </div>
    </>
  );
}

export default Profile;