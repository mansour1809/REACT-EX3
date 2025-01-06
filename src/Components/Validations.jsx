import { cities } from "../assets/citiesAndMonths";

const Validations = (name, value, password = null) => {
  //pattern using regex
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/;
  const hebrewLettersRegex = /^[\u0590-\u05FF\s]+$/;
  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const userNameRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/]*$/;

  //check if the username already exist or not
  const isExist = (name) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isE = users.find((u) => u.username === name);
    return isE ? true : false;
  };

  //check if the email already exist or not
  const isEmailExist = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isE = users.find((u) => u.email === email);
    return isE ? true : false;
  };

  switch (name) {
    case "username":
      return !userNameRegex.test(value)
        ? "invalid , only Latin letters, numbers, and special characters are allowed"
        : value.length > 60
        ? "the text should be less than 60 charachters"
        : isExist(value)
        ? "the username already exist, please choose a different username"
        : "";
    case "password":
      return !passwordRegex.test(value) ? "password must contain between 7 to 12 characters. At least one special character, one uppercase letter, and one number." : "";

    case "confirmPassword":
      return password === value ? "" : "Passwords are not the same..";

    case "street":
      return hebrewLettersRegex.test(value)
        ? ""
        : "street needs to be in hebrew letters...";

    case "email":
      return !emailRegex.test(value)
        ? "email format need to be in Latin letters and special characters. The '@' character can appear only once, at the end"
        : isEmailExist(value)
        ? "the email already exist, choose a different email address"
        : "";

    case "lastName":
      return hebrewLettersRegex.test(value)
        ? ""
        : "lastName needs to be in hebrew letters...";

    case "firstName":
      return hebrewLettersRegex.test(value)
        ? ""
        : "firstName needs to be in hebrew letters...";

    case "birthDate":
      return validDate(value) ? "" : "age should be between 18 and 120...";

    case "city":
      return cities.includes(value) //check if the input is in the list
        ? ""
        : "need to choose from the list...";

    case "img":
      return value.type !== "image/jpeg" && value.type !== "image/jpg"
        ? "the file need to be in jpeg or jpg format..."
        : "";

    default:
      break;
  }
};

const validDate = (value) => {
  //age validations (between 18 and 120)
  const selectedDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - selectedDate.getFullYear();
  const monthDiff = today.getMonth() - selectedDate.getMonth();
  // If the birthday hasn't occurred this year yet
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < selectedDate.getDate())
  )
    age--;
  // Validate age range
  return age < 18 || age > 120 ? false : true;
};

export default Validations;
