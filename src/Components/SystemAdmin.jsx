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
import { useState } from "react";
import Swal from "sweetalert2";
import NavBar from "./NavBar";
import { monthsInHebrew } from "../assets/citiesAndMonths";

export default function SystemAdmin() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const handleDelete = (userToDelete) => {
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
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
      }
    });
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
                  <TableCell align="center" sx={{ width: "15%" }}>
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
                  <TableCell  align="center" sx={{ width: "20%", }}>
                  <Stack
    direction="row" // Horizontally align the avatar and username
    spacing={1} // Add spacing between the avatar and username
    sx={{
      justifyContent: 'center', // Ensures the entire Stack (Avatar + Typography) is centered
      alignItems: 'center', // Vertically align them
      textAlign:'left'
    }}
  >
                      <Typography sx={{ fontWeight: 'bold' }}>{user.username}</Typography>
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
    </>
  );
}

function hebrewFromatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")} ${
    monthsInHebrew[date.getMonth()]
  } ${date.getFullYear()}`;
}
