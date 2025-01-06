import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavBar from "./NavBar";
import { monthsInHebrew } from "../assets/citiesAndMonths";
import { useNavigate } from "react-router-dom";
import EditDetails from "./EditDetails";

export default function SystemAdmin() {
  const [selectedUser,setSelectedUser] = useState({});
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {//if the session storage is null
    if (!sessionStorage.getItem("user")) {
      setIsLoggedIn(false);
      setTimeout(() => navigate("/"), 1200); // redirect to login page
    }
  }, [navigate]);

  if (!isLoggedIn) {// if the user route to profile not by clicking on the login button
    return (
      <p
        style={{
          color: "red",
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Unauthorized access. Please log in first.
      </p>
    );
  }

  const handleDelete = (userToDelete) => {//delete a user
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "!לא תוכל לשחזר משתמש זה",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "!כן, מחק",
      cancelButtonText: "ביטול",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUsers = users.filter(
          (user) => user.email !== userToDelete.email
        );
        //updating the state and the local storage after delete the user
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
      }
    });
  };

  //updates part of user details
  const handleUpdateUser = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const updatedUsers = users.map((u) =>
      u.email === selectedUser.email ? updatedUser : u
    );
    //update the local storage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers)
  };

  return (
    <>
      <NavBar />
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", margin: "2rem auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "10%" }}></TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                אימייל
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                תאריך לידה
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                כתובת
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                שם מלא
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                שם משתמש
              </TableCell>
            </TableRow>
          </TableHead>
          {users.length > 0 ? (
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.email}
                  sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell align="center" sx={{ width: "10%" }}>
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <IconButton
                        sx={{
                          width: 30,
                          height: 30,
                          backgroundColor: "primary.main",
                          "&:hover": { backgroundColor: "primary.dark" },
                          color: "white",
                        }}
                        onClick={() => {
                          setShowEditForm(!showEditForm);//toggle the form
                          setSelectedUser(user); //selected uesr..
                        }}
                      >
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        sx={{
                          width: 30,
                          height: 30,
                          backgroundColor: "error.main",
                          "&:hover": { backgroundColor: "error.dark" },
                          color: "white",
                        }}
                        onClick={() => handleDelete(user)}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "25%" }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "15%" }} dir="rtl">
                    {hebrewFromatDate(user.birthDate)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ width: "15%" }}
                  >{`${user.street} ${user.number}, ${user.city}`}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ width: "15%" }}
                  >{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Stack
                      direction="row" // Horizontally align the avatar and username
                      spacing={1} // Add spacing between the avatar and username
                      sx={{
                        justifyContent: "center", // Ensures the entire Stack (Avatar + Typography) is centered
                        alignItems: "center", // Vertically align them
                        textAlign: "left",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        {user.username}
                      </Typography>
                      <Avatar
                        src={user.img}
                        alt="User Avatar"
                        sx={{
                          width: 60,
                          height: 60,
                          border: "1px solid white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          marginBottom: 2,
                        }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "red" }}>
                  לא נמצא משתמשים
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {showEditForm && (
        <EditDetails
          onUpdate={handleUpdateUser}
          closeForm={() => setShowEditForm(false)}
          isFromAdmin={true} // Pass this flag to indicate admin update
          user={selectedUser} // Pass the selected user to the form
        />
      )}
    </>
  );
}

function hebrewFromatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")} ${
    monthsInHebrew[date.getMonth()]
  } ${date.getFullYear()}`;
}
