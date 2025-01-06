import {  useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";
import Swal from "sweetalert2";
import { Button} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar() {
  const navigate = useNavigate();
  const userName = JSON.parse(sessionStorage.getItem("user")).username;
  
  const logoutAdmin = () => {
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

  return (
    <nav className="navbar" dir="rtl">
       {userName === 'admin' && <Button
            variant="contained"
            color="error"
            startIcon={ <LogoutIcon sx={{marginLeft:1}}/> }
            sx={{
              "&:hover": {
                backgroundColor: "#b62c2c",
              },
              width:100
            }}
            onClick={() => logoutAdmin()}
          >
              התנתק  
          </Button>
}
      <p>
        שלום, {userName}
      </p>
      <p>
      {userName === 'admin' ? "Admin Managment" :"User Profile"}
      </p>

    </nav>
  );
}

