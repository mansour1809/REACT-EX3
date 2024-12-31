// Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Validations from "./Validations";

import { cities } from "../assets/cities";
import PropTypes from "prop-types";

function Register(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    img: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    street: "",
    number: 0,
  });
  const [errors, setErrors] = useState({});

  const handleBlur = (name, e) => {
    if (e.target.value && name !== "img") {
      //checking validations only if the input is not empty and not a file input
      name === "confirmPassword"
        ? setErrors((prev) => ({
            ...prev,
            [name]: Validations(name, e.target.value, formData.password),
          }))
        : setErrors((prev) => ({
            ...prev,
            [name]: Validations(name, e.target.value),
          }));
    }
  };

  const handleChange = (name, e) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData({ ...formData, [name]: e.target.value });
    if (name === "img") {
      const validation = Validations(name, e.target.files[0]);
      setErrors((prev) => ({ ...prev, [name]: validation }));
      if (validation) e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    //double check for validaitons after submit
    Object.keys(formData).forEach((name) => {
      if (name !== "img") {
        const validation =
          name !== "confirmPassword" //need to send also password when validate confirmPasswird
            ? Validations(name, formData[name])
            : Validations(name, formData[name], formData.password);
        if (validation) formErrors[name] = validation;
      }
    });

    Object.keys(formErrors).length > 0 ? setErrors(formErrors) : registerUser();//if there is no errors, register
  };

  const registerUser = () => {
    setErrors({});
    const users = props.users; // get the existing users from local storage
    console.log(users)
    const isExist = users.find(u => u.username === formData.username )
    console.log(isExist)
    if(isExist) // checking if the userName exist
      setErrors({'username' : "user name already exist"})
     else{ 
      users.push(formData); // add the new user to the array
    localStorage.setItem("users", JSON.stringify(users)); // save to the local storage
    alert("User registered successfully");
  }
  };

  return (
    <>
      <Link to="/" className="back-button">
        Back to Login
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => handleChange("username", e)}
          onBlur={(e) => handleBlur("username", e)}
          required
        />
        <ErrMsg msg={errors["username"]} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange("password", e)}
          onBlur={(e) => handleBlur("password", e)}
          required
        />
        <ErrMsg msg={errors["password"]} />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => handleChange("confirmPassword", e)}
          onBlur={(e) => handleBlur("confirmPassword", e)}
          required
        />
        <ErrMsg msg={errors["confirmPassword"]} />
        <input
          type="file"
          name="img"
          placeholder="Profile Picture"
          onChange={(e) => handleChange("img", e)}
          onBlur={(e) => handleBlur("img", e)}
          required
        />
        <ErrMsg msg={errors["img"]} />

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) => handleChange("firstName", e)}
          onBlur={(e) => handleBlur("firstName", e)}
          required
        />
        <ErrMsg msg={errors["firstName"]} />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => handleChange("lastName", e)}
          onBlur={(e) => handleBlur("lastName", e)}
          required
        />
        <ErrMsg msg={errors["lastName"]} />

        <input
          type="email"
          name="email"
          placeholder="Email"
          // title="Email must contain exactly one @ followed by .com"
          onChange={(e) => handleChange("email", e)}
          onBlur={(e) => handleBlur("email", e)}
          required
        />
        <ErrMsg msg={errors["email"]} />

        <input
          type="date"
          name="birthDate"
          placeholder="Birth Date"
          onChange={(e) => handleChange("birthDate", e)}
          onBlur={(e) => handleBlur("birthDate", e)}
          required
        />
        <ErrMsg msg={errors["birthDate"]} />

        <input
          type="text"
          name="city"
          placeholder="City"
          list="cities"
          onChange={(e) => handleChange("city", e)}
          onBlur={(e) => handleBlur("city", e)}
          required
        />
        <datalist id="cities">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
        <ErrMsg msg={errors["city"]} />

        <input
          type="text"
          name="street"
          placeholder="Street"
          // title="שם הרחוב צריך להיות באותיות עברית בלבד"
          onChange={(e) => handleChange("street", e)}
          onBlur={(e) => handleBlur("street", e)}
          required
        />
        <ErrMsg msg={errors["street"]} />

        <input
          type="number"
          name="number"
          placeholder="מספר רחוב"
          onChange={(e) => handleChange("number", e)}
          min={0}
          required
        />

        <button type="submit">Register</button>
      </form>
    </>
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
