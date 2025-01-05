// Profile.jsx
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import EditIcon from "@mui/icons-material/Edit";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LogoutIcon from "@mui/icons-material/Logout";
import { monthsInHebrew } from "../assets/citiesAndMonths";
import { useEffect, useState } from "react";
import {Card,CardContent,Box,Typography,Button,Stack,Avatar} from "@mui/material";
import EditDetails from "./EditDetails";

function Profile() {
  const game="https://www.yad.com/Minecraft-Blockman-Go#goog_game_inter"
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  // const user = state?.user;
  const [user, setUser] = useState(state?.user || JSON.parse(sessionStorage.getItem("user")));
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      setIsLoggedIn(false);
      setTimeout(() => navigate("/"), 1200); // redirect to login page
    }
  }, [navigate]);

  if (!isLoggedIn) {
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

  const logoutUser = () => {
    Swal.fire({
      title: "?האם אתה בטוח",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, התנתק",
      cancelButtonText: "ביטול",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/", {
          state: { users: JSON.parse(localStorage.getItem("users")) },
        });
      }
    });
  };

  const handleUpdateUser = (updatedData) => {
    // Update the local user state to reflect changes
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);

    // Update sessionStorage and localStorage
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users"));
    const updatedUsers = users.map((u) => 
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };



  return (
    <>
    <Card
      sx={{
        maxWidth: 470,
        textAlign: "right",
        margin: "8rem auto",
        padding: 2,
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      }}
    >
      {/* Profile Image Container */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Avatar
          src={user.img}
          alt="User Avatar"
          sx={{
            width: 120,
            height: 120,
            border: "4px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            marginBottom: 2,
          }}
        />
      </Box>

      <CardContent>
        {/* User Details */}
        <Stack spacing={2} direction="column" alignItems="center" dir="rtl">
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: "1.8rem",
              marginBottom: 1,
            }}
          >
            {user.firstName} {user.lastName}
          </Typography>

          <Stack alignItems="right" spacing={1.5} sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <EmailIcon sx={{ color: "Grey" }} />
              <Typography>{user.email}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "right", gap: 1 }}>
              <LocationOnIcon sx={{ color: "Grey" }} />
              <Typography>
                {user.street} {user.number}, {user.city}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CakeIcon sx={{ color: "Grey" }} />
              <Typography>{hebrewFromatDate(user.birthDate)}</Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Buttons */}
        <Stack spacing={2} direction="row" mt={4} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            endIcon={<LogoutIcon />}
            sx={{
              "&:hover": {
                backgroundColor: "#b62c2c",
              },
            }}
            onClick={() => logoutUser()}
          >
            התנתק
          </Button>
          <Button
            variant="contained"
            color="success"
            endIcon={<SportsEsportsIcon />}
            sx={{
              "&:hover": {
                backgroundColor: "#235f26",
              },
            }}
            onClick={() => window.open(game, "_blank")}
          >
            למשחק
          </Button>
          <Button 
                    onClick={() => setShowEditForm(!showEditForm)}
                    variant="contained" 
                    color="primary" 
                    endIcon={<EditIcon />}
                >
                    עדכן פרטים
                </Button>
        </Stack>
      </CardContent>
    </Card>
                {showEditForm && <EditDetails onUpdate={handleUpdateUser} closeForm={() => setShowEditForm(false)}/>}
</>
  );
}

export default Profile;

 function hebrewFromatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")} ${monthsInHebrew[date.getMonth()]} ${date.getFullYear()}`;
 }

