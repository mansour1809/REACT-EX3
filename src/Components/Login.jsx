// Login.jsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

function Login(props) {
  // sessionStorage.clear()
  const { register } = useForm();
  const { state } = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const allUsers = state?.users || props.users;
  const [loginSuccess, setLoginSuccess] = useState(false); // Track login success
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const togglePasswordVisibility = () => { //toggle password visibility
    setShowPassword((prev) => !prev);
  };
  const submit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  const loginUser = (username, password) => {
    const valid = allUsers.find((u) =>
      u.username == username && u.password == password ? u : false
    );
    if (username === "admin" && password === "ad12343211ad") { //chekcs if the user is the admin
      sessionStorage.setItem(
        "user",
        JSON.stringify({ username: username, password: password })
      );
      setLoginSuccess(true); // Set success
      setTimeout(
        () => navigate("/systemAdmin", { state: { users: allUsers } }),
        1200
      );
    } else if (valid) {
      sessionStorage.setItem("user", JSON.stringify(valid));
      setLoginSuccess(true); // Set success
      setTimeout(() => navigate("/profile", { state: { user: valid } }), 1200); // redirect to profile page
    } else setErrorMsg("שם משתמש או סיסמה לא נכונים");
  };

  useEffect(() => {
    // fill the inputs id whe route from the register page
    if (state?.lastRegistered) {
      setUsername(state.lastRegistered);
      setPassword(state.lastRegisteredPass);
      window.history.replaceState({}, document.title); //clear the state value
    }
    sessionStorage.clear();
  }, [state]);

  return (
    <>
      {loginSuccess ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p style={{ color: "green" }} > {username}, שלום  </p>
        </div>
      ) : (
        <form onSubmit={submit} style={{ marginTop: 100 }}>
          <div>
            <input
              className={username ? "input-field" : ""}
              {...register("username", { required: true })}
              placeholder="שם משתמש"
              value={username}
              onChange={(e) => {
                setErrorMsg(""), setUsername(e.target.value);
              }}
            />
            </div>
            <div style={{ position: "relative", display: "inline-block" ,width:"100%"}}>
        <input
          className={password ? "input-field" : ""}
          {...register("password", { required: true })}
          placeholder="סיסמא"
          value={password}
          type={showPassword ? "text" : "password"} // toggle type based on state
          onChange={(e) => {
            setErrorMsg("");
            setPassword(e.target.value);
          }}
          style={{ paddingRight: "30px" }} // adjust padding for the icon
        />
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          {showPassword ? <VisibilityOffIcon/> : <Visibility/>} 
        </span>
      </div>
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
