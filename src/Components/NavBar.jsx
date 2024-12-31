import { Link } from "react-router-dom";
import { useState } from "react";
import "../Styles/NavBar.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </button>
      <div className={`menu ${menuOpen ? "show" : ""}`}>
        <Link to="/" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        <Link to="/systemAdmin" className="nav-link">
          SystemAdmin
        </Link>
      </div>
    </nav>
  );
}
