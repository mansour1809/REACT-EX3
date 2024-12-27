

const useUsers = () => {

    const loadUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  
  return { loadUsers };
};

export default useUsers;
