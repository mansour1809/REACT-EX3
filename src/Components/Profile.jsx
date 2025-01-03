// Profile.jsx
import { useLocation, useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Stack,
  Avatar
} from "@mui/material";

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;

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

  console.log(user);
  return (
    <Card 
  sx={{ 
    maxWidth: 400,
    textAlign: "right", 
    margin: "8rem auto", 
    padding: 2,
    borderRadius: 4,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  }}
>
  {/* Profile Image Container */}
  <Box
    sx={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 2
    }}
  >
    <Avatar
      src={user.img}
      alt="User Avatar"
      sx={{
        width: 120,
        height: 120,
        border: '4px solid white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        marginBottom: 2
      }}
    />
  </Box>

  <CardContent>
    {/* User Details */}
    <Stack spacing={2} direction="column" alignItems="center">
      <Typography 
        variant="h5" 
        component="div"
        sx={{ 
          fontWeight: 'bold',
          fontSize: '1.8rem',
          marginBottom: 1
        }}
      >
        {user.firstName} {user.lastName}
      </Typography>

      <Stack spacing={1.5} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ color: 'primary.main' }} />
          <Typography>{user.email}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: 'primary.main' }} />
          <Typography>
            {user.street} {user.number}, {user.city}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CakeIcon sx={{ color: 'primary.main' }} />
          <Typography>{user.birthDate}</Typography>
        </Box>
      </Stack>
    </Stack>

    {/* Buttons */}
    <Stack 
      spacing={2} 
      direction="row" 
      marginTop={4}
      justifyContent="center"
    >
      <Button 
        variant="contained" 
        color="primary"
        startIcon={<EditIcon />}
        sx={{ borderRadius: 2 }}
      >
        עדכן פרטים
      </Button>
      <Button 
        variant="contained" 
        color="success"
        startIcon={<SportsEsportsIcon />}
        sx={{ borderRadius: 2 }}
      >
        למשחק
      </Button>
      <Button 
        variant="contained" 
        color="error"
        startIcon={<LogoutIcon />}
        sx={{ borderRadius: 2 }}
      >
        התנתק
      </Button>
    </Stack>
  </CardContent>
</Card>
  );
}

export default Profile;
