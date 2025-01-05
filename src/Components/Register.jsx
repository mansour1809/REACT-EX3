// Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "../Styles/Register.css";
import UserForm from "./UserForm";

function Register(props) {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
 
  const registerUser = (formData,setErrors) => {
    setErrors({});
    const users = props.users; // get the existing users from local storage
    const isUserNameExist = users.find((u) => u.username === formData.username);
    const isEmailExist = users.find((u) => u.email === formData.email);
    if (isUserNameExist || formData.username === "admin")
      // checking if the userName exist
      setErrors({ username: "user name already exist" });
    else if (isEmailExist)
      setErrors({ email: "email already exist" }); //checki f the email exist
    else {
      users.push(formData); // add the new user to the array
      localStorage.setItem("users", JSON.stringify(users)); // save to the local storage
      setIsRedirecting(true);
      setTimeout(() => {
        navigate("/", {
          state: {
            users: users,
            lastRegistered: formData.username,
            lastRegisteredPass: formData.password,
          },
        });
      }, 1200);
    }
  };

  return (
    <div style={{ paddingTop: 50 }}>
      <Link to="/" className="back-button">
        Back to Login
      </Link>
      {isRedirecting ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p style={{ color: "green" }}>Registered successfully</p>
          <p style={{ color: "green" }}>Redirecting to login...</p>
        </div>
      ) : (
        <UserForm onSubmit={registerUser} />
      )}
    </div>
  );
}

export default Register;

function ErrMsg(props) {
  return props.msg ? (
    <span className="errMsg" style={{ color: "red" }}>
      {props.msg}
    </span>
  ) : null;
}

ErrMsg.propTypes = {
  msg: PropTypes.string,
};
Register.propTypes = {
  users: PropTypes.array.isRequired,
};
