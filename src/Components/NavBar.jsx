// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "../Styles/NavBar.css";

// export default function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
// const [user, setUser] = useState({})

// useEffect(() => {
//   let user = JSON.parse(sessionStorage.getItem("user"))
//   setUser(user)
// },[])

//   const logoutUser=(userEmail)=>{

//   }

//   return (
//     <nav className="navbar">
//       <button
//         className="hamburger"
//         onClick={() => setMenuOpen((prev) => !prev)}
//       >
//         ☰
//       </button>
//       <div className={`menu ${menuOpen ? "show" : ""}`}>
//         <Link to="/" className="nav-link">
//           Login
//         </Link>
//         <Link to="/register" className="nav-link">
//           Register
//         </Link>
//         <Link to="/profile" className="nav-link">
//           Profile
//         </Link>
//         <Link to="/systemAdmin" className="nav-link">
//           SystemAdmin
//         </Link>
//         <Link to="/" className="nav-link" onClick={logoutUser(user.email)}>
//           Logout
//         </Link>
//       </div>
//     </nav>
//   );
// }
