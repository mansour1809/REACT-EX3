// Login.jsx
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../App.css";
import "../index.css";
import PropTypes from "prop-types";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  const handleChange = (name, e) => {
    setErrorMsg("");
    if (name === "password") {
      setPassword(e.target.value);
    } else setUsername(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  const loginUser = (username, password) => {
    const valid = props.users.find((u) =>
      u.username == username && u.password == password ? u : false
    );
    if (valid) {
      sessionStorage.setItem("user", JSON.stringify(valid));
      <Navigate to="/profile" users={props.users} />;
    } else setErrorMsg("שם משתמש או סיסמה לא נכונים");
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => handleChange("username", e)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => handleChange("password", e)}
        required
      />
      <span className="errMsg" style={{ color: "red" }}>
        {ErrorMsg}{" "}
      </span>
      <br />
      <button id="loginBtn" type="submit">
        כניסה
      </button>
      <br />
      אין לך עדיין משתמש? <Link to="/register">הרשמה</Link>
    </form>
  );
}

Login.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Login;
