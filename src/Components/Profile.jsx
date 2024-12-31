// Profile.jsx
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

function Profile() {
  const {state} = useLocation();
  console.log(state)
  const user = state
  console.log(user)
  

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