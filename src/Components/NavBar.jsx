import { Link } from "react-router-dom";

export default function NavBar() {
  return (
<nav>
      <button><Link to="/">Login</Link></button>
      <button><Link to="/register">register</Link></button>
      <button><Link to="/profile">profile</Link></button>
      <button><Link to="/systemAdmin">systemAdmin</Link></button>
      <button><Link to="/systemAdmin">systemAdmin</Link></button>
    </nav>
      
)
}
