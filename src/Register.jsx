// Register.jsx
import  { useState } from 'react';

function Register() {
  
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '',
    confirmPassword: '',
    img:'',
    firstName:'',
    lastName:'',
    email: '',
    birthDate: '',
    city: '',
    street: '',
    number: 0
   });

  const handleChange = (name , e) => {
    if (name === "number") {
      setFormData({ ...formData, [name]: parseInt(e.target.value, 10) });
    } else if (name === "birthDate") {
      setFormData({ ...formData, [name]: new Date(e.target.value) });
    } else if (name === "img") {
      setFormData({ ...formData, [name]: e.target.files[0] }); 
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };
<<<<<<< HEAD
=======

>>>>>>> 046f6e39ec65509a7cdcbe714d70efc53c9ae2f0
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={(e)=>handleChange("username" , e)} required />
      <input type="password" name="password" placeholder="Password" onChange={(e)=>handleChange("password" , e)} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e)=>handleChange("confirmPassword" , e)} required />
     <input type="file" name="img" placeholder="Profile Picture" onChange={(e)=>handleChange("img" , e)} required/>
     <input type="text" name="firstName" placeholder="First Name" onChange={(e)=>handleChange("firstName" , e)} required/>
     <input type="text" name="lastName" placeholder="Last Name" onChange={(e)=>handleChange("lastName" , e)} required/>
     <input type="email" name="email" placeholder="Email" onChange={(e)=>handleChange("email" , e)} required />
     <input type="date" name="birthDate" placeholder="Birth Date" onChange={(e)=>handleChange("birthDate" , e)} required/>
     <input type="text" name="city" placeholder='City' onChange={(e)=>handleChange("city" , e)}/>
     <input type="text" name="street" placeholder='Street' onChange={(e)=>handleChange("street" , e)}/>
     <input type="number" name="number" placeholder='Number' onChange={(e)=>handleChange("number" , e)} min={0}/>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
