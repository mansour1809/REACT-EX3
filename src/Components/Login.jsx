// Login.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";
import PropTypes from "prop-types";

function Login(props) {
  const {state} = useLocation()
  const [username, setUsername] = useState(state?.lastRegistered || "");
  const [password, setPassword] = useState(state?.lastRegisteredPass,"");
  const [ErrorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const allUsers = state?.users || props.users


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
    if(username === "admin" && password === "ad12343211ad")
    {
      sessionStorage.setItem("user", JSON.stringify({'username':username , 'password':password}));
alert('welcome , ',{username})      
      navigate("/systemAdmin", { state: { users: allUsers } });
    }
    const valid = allUsers.find((u) =>
      u.username == username && u.password == password ? u : false
    );
    if (valid) {
      sessionStorage.setItem("user", JSON.stringify(valid));
alert('welcome , ',{username})
      navigate("/profile", { state: { user: valid } });
    } else setErrorMsg("שם משתמש או סיסמה לא נכונים");
  };

  return (
    <form onSubmit={submit} style={{marginTop:100}}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => handleChange("username", e)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
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
  lastRegistered : PropTypes.string
};

export default Login;
