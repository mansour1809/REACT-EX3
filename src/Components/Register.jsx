// Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
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

  const handleChange = (name, e) => {
    if (name === "number") {
      setFormData({ ...formData, [name]: parseInt(e.target.value, 10) });
    } else if (name === "birthDate") {
      const selectedDate = new Date(e.target.value);
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      // Adjust age calculation if the birthday hasn't occurred this year yet
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < selectedDate.getDate())
      ) {
        age--;
      }
      // Validate age range
      if (age < 18 || age > 120) {
        alert("You must be between 18 and 120 years old.");
        return; // Stop further processing
      }

      setFormData({ ...formData, [name]: new Date(e.target.value) });
    } else if (name === "img") {
      if (e.target.files[0]) {
        // Validate file type
        const validTypes = ["/jpeg", "/jpg"];

        if (!validTypes.includes(e.target.files[0].type)) {
          alert("Please upload a JPEG or JPG file.");
          return; // Stop processing if the file is invalid
        }
        setFormData({ ...formData, [name]: e.target.files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully");
  };

  const cities = [
    "תל אביב",
    "ירושלים",
    "חיפה",
    "באר שבע",
    "ראשון לציון",
    "פתח תקווה",
    "אשדוד",
    "נתניה",
    "בני ברק",
    "חולון",
    "רמת גן",
    "אשקלון",
    "רחובות",
    "בת ים",
    "הרצליה",
    "כפר סבא",
    "מודיעין",
    "רעננה",
    "לוד",
    "רמלה",
    "נצרת",
    "עפולה",
    "אילת",
  ];

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
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$"
          title="Password must be at least 12 characters and include at least one number and one special character"
          onChange={(e) => handleChange("password", e)}
          required
        />{" "}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => handleChange("confirmPassword", e)}
          required
        />
        <input
          type="file"
          name="img"
          placeholder="Profile Picture"
          onChange={(e) => handleChange("img", e)}
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) => handleChange("firstName", e)}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => handleChange("lastName", e)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$"
          title="Email must contain exactly one @ followed by .com"
          onChange={(e) => handleChange("email", e)}
          required
        />{" "}
        <input
          type="date"
          name="birthDate"
          placeholder="Birth Date"
          onChange={(e) => handleChange("birthDate", e)}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          list="cities"
          onChange={(e) => handleChange("city", e)}
        />
        <datalist id="cities">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
        <input
          type="text"
          name="street"
          placeholder="Street"
          pattern="[\u0590-\u05FF\s]+"
          title="שם הרחוב צריך להיות באותיות עברית בלבד"
          onChange={(e) => handleChange("street", e)}
        />
        <input
          type="number"
          name="number"
          placeholder="מספר רחוב"
          onChange={(e) => handleChange("number", e)}
          min={0}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
export default Register;
