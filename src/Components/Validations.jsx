import { cities } from "../assets/citiesAndMonths";

const Validations = (name, value, password = null) => {
  //pattern using regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,12}$/;
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
        ? "invalid , should be..."
        : value.length > 60
        ? "the text should be less than 60 charachters"
        : isExist(value)
        ? "the username already exist, choose diff.."
        : "";
    case "password":
      return !passwordRegex.test(value) ? "password need to contain...." : "";

    case "confirmPassword":
      return password === value ? "" : "not the same..";

    case "street":
      return hebrewLettersRegex.test(value)
        ? ""
        : "street need to be in hebrew letters...";

    case "email":
      return !emailRegex.test(value)
        ? "email format need to ...."
        : isEmailExist(value)
        ? "the email already exist, choose diff.."
        : "";

    case "lastName":
      return hebrewLettersRegex.test(value)
        ? ""
        : "lastName need to be in hebrew letters...";

    case "firstName":
      return hebrewLettersRegex.test(value)
        ? ""
        : "firstName need to be in hebrew letters...";

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
  // if the birthday hasn't occurred this year yet
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < selectedDate.getDate())
  )
    age--;
  // validate age range
  return age < 18 || age > 120 ? false : true;
};

export default Validations;
