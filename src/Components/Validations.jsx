import { cities } from "../assets/citiesAndMonths";

const Validations = (name, value, password = null) => {
  //pattern using regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,12}$/;
  const hebrewLettersRegex = /^[\u0590-\u05FF\s]+$/;
  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const userNameRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/]*$/;

  // //check if the username already exist or not
  // const isExist = (name) => {
  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const isE = users.find((u) => u.username === name);
  //   return isE ? true : false;
  // };

  // //check if the email already exist or not
  // const isEmailExist = (email) => {
  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const isE = users.find((u) => u.email === email);
  //   return isE ? true : false;
  // };

  switch (name) {
    case "username":
      return !userNameRegex.test(value)
        ? "לא חוקי, רק אותיות לטיניות, מספרים ותווים מיוחדים מותרים"
        : value.length > 60
        ? "הטקסט צריך להיות פחות מ-60 תווים"
        // : isExist(value)
        // ? "שם המשתמש כבר קיים, אנא בחר שם משתמש אחר"
        : "";
    case "password":
      return !passwordRegex.test(value) ? "הסיסמה חייבת להכיל בין 7 ל-12 תווים. לפחות תו מיוחד אחד, אות אחת גדולה ומספר אחד." : "";
    case "confirmPassword":
      return password === value ? "" : "הסיסמאות אינן זהות..";

    case "street":
      return hebrewLettersRegex.test(value)
        ? ""
        : "הרחוב צריך להיות באותיות עבריות...";

    case "email":
      return !emailRegex.test(value)
        ? "אותיות לטיניות ותווים מיוחדים. התו '@' יכול להופיע רק פעם אחת, בסוף"
        // : isEmailExist(value)
        // ? "האימייל כבר קיים, בחר כתובת אחרת"
        : "";

    case "lastName":
      return hebrewLettersRegex.test(value)
        ? ""
        : "שם משפחה צריך להיות באותיות עבריות...";

    case "firstName":
      return hebrewLettersRegex.test(value)
        ? ""
        : "השם הפרטי צריך להיות באותיות עבריות...";

    case "birthDate":
      return validDate(value) ? "" : "הגיל צריך להיות בין 18 ל-120...";

    case "city":
      return cities.includes(value) //check if the input is in the list
        ? ""
        : "צריך לבחור מהרשימה...";

    case "img":
      return value.type !== "image/jpeg" && value.type !== "image/jpg"
        ? "הקובץ צריך להיות בפורמט jpeg או jpg..."
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
