// Login.jsx
import {  useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

function Login(props) {
  // sessionStorage.clear()
  const { register} = useForm();
  const { state } = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const allUsers = state?.users || props.users;
  const [loginSuccess, setLoginSuccess] = useState(false); // Track login success

  const submit = (e) => {
    e.preventDefault()
    loginUser(username, password);
  };

  const loginUser = (username, password) => {
    const valid = allUsers.find((u) => u.username == username && u.password == password ? u : false);
    if (username === "admin" && password === "ad12343211ad") {
      sessionStorage.setItem(
        "user",
        JSON.stringify({ username: username, password: password })
      );
      setLoginSuccess(true); // Set success
      setTimeout(() =>navigate("/systemAdmin", { state: { users: allUsers } }), 1200);
    }
    else if (valid) {
      sessionStorage.setItem("user", JSON.stringify(valid));
      setLoginSuccess(true); // Set success
      setTimeout(() => navigate("/profile", { state: { user: valid } }), 1200); // redirect to profile page
    } else setErrorMsg("שם משתמש או סיסמה לא נכונים");
  };

  useEffect(() => {
    // fill the inputs id whe route from the register
        if (state?.lastRegistered) {
        setUsername(state.lastRegistered);
        setPassword(state.lastRegisteredPass);
        window.history.replaceState({}, document.title);//clear the state value
    } 
    sessionStorage.clear()
}, [state]);

  return (
    <>
      {loginSuccess ? (
        <div className="spinner-container">
        <div className="spinner"></div>
        <p style={{ color: "green" }}>Welcome! , {username}</p>
      </div>
      ) : (
        <form onSubmit={submit} style={{ marginTop: 100 }}>
          <div>
            <input
              className={username ? "input-field" : ""}
              {...register("username", { required: true })}
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setErrorMsg(""), setUsername(e.target.value);
              }}
            />
          </div>
          <input
            className={password ? "input-field" : ""}
            {...register("password", { required: true })}
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => {
              setErrorMsg(""), setPassword(e.target.value);
            }}
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
      )}
    </>
  );
}

Login.propTypes = {
  users: PropTypes.array.isRequired,
  lastRegistered: PropTypes.string,
};

export default Login;
