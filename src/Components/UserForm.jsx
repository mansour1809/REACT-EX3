import { useState } from "react";
import Validations from "./Validations";

import { cities } from "../assets/citiesAndMonths";

import "../Styles/Register.css";
import PropTypes from "prop-types";

export default function UserForm({ initialData, isEditMode, onSubmit ,fromAdmin}) {

  const [formData, setFormData] = useState(
    initialData || {
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
    }
  );

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
    if (name === "img") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        // Set up the onloadend event to update formData once the file is read
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            [name]: reader.result, // Base64 string after reading the file
          }));
        };
        // Read the file as a base64 string
        reader.readAsDataURL(file);
        // Validation for the image
        const validation = Validations(name, file);
        setErrors((prev) => ({ ...prev, [name]: validation }));
        if (validation) e.target.value = null;
      }
    } else {
      //empty the field when typing
      setErrors((prev) => ({ ...prev, [name]: "" }));
      //set the value
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
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

    Object.keys(formErrors).length > 0
      ? setErrors(formErrors)
      : onSubmit(formData, setErrors); //if there is no errors, register
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        disabled={fromAdmin}
        onChange={(e) => handleChange("username", e)}
        onBlur={(e) => handleBlur("username", e)}
        required
      />
      <ErrMsg msg={errors["username"]} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        disabled={fromAdmin}
        onChange={(e) => handleChange("password", e)}
        onBlur={(e) => handleBlur("password", e)}
        required
      />
      <ErrMsg msg={errors["password"]} />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
         disabled={fromAdmin}
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
        required={!isEditMode} // Required only in register mode
      />
      {isEditMode && formData.img && (
        <div className="current-image">
          <p>Current Profile Picture:</p>
          <img
            src={formData.img}
            alt="Current Profile"
            style={{ width: "70px", height: "70px", objectFit: "cover",borderRadius:"50%" }}
          />
        </div>
      )}
      <ErrMsg msg={errors["img"]} />

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        // disabled={isEditMode}
        onChange={(e) => handleChange("firstName", e)}
        onBlur={(e) => handleBlur("firstName", e)}
        required
      />
      <ErrMsg msg={errors["firstName"]} />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        // disabled={isEditMode}
        onChange={(e) => handleChange("lastName", e)}
        onBlur={(e) => handleBlur("lastName", e)}
        required
      />
      <ErrMsg msg={errors["lastName"]} />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        disabled={isEditMode}
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
        value={formData.birthDate}
        // disabled={isEditMode}
        onChange={(e) => handleChange("birthDate", e)}
        onBlur={(e) => handleBlur("birthDate", e)}
        required
      />
      <ErrMsg msg={errors["birthDate"]} />

      <input
        type="text"
        name="city"
        value={formData.city}
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
        value={formData.street}
        // title="שם הרחוב צריך להיות באותיות עברית בלבד"
        onChange={(e) => handleChange("street", e)}
        onBlur={(e) => handleBlur("street", e)}
        required
      />
      <ErrMsg msg={errors["street"]} />

      <input
        type="number"
        name="number"
        value={formData.number}
        placeholder="מספר רחוב"
        onChange={(e) => handleChange("number", e)}
        min={0}
        required
      />

      <button type="submit">{isEditMode ? "Update" : "Register"}</button>
    </form>
  );
}

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

UserForm.propTypes = {
  initialData: PropTypes.object,
  isEditMode: PropTypes.bool,
  onSubmit: PropTypes.func,
  fromAdmin:PropTypes.bool
};
