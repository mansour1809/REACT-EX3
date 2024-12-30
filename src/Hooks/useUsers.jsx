

const useUsers = () => {

    

 const registerUser = (user)=>{
    const users = loadUsers();  // get the existing users from local storage
    users.push(user);  // add the new user to the array
    localStorage.setItem("users", JSON.stringify(users));// save to the local storage 
 }

  return { loadUsers, registerUser };


};

export default useUsers;
