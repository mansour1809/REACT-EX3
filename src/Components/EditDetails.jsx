import { Box } from "@mui/material";
import UserForm from "./UserForm";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

// EditDetails.jsx
function EditDetails({closeForm ,onUpdate }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    const editUser = (updatedData) => {
        const users = JSON.parse(localStorage.getItem("users"));
        const updatedUsers = users.map((u) =>
          u.email === user.email ? { ...u, ...updatedData } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        sessionStorage.setItem("user", JSON.stringify({ ...user, ...updatedData }));
    
        // Call the onUpdate prop to update the Profile state
        onUpdate(updatedData);
    
        Swal.fire({
          title: "הפרטים עודכנו בהצלחה!",
          icon: "success",
        }).then(() => {
          closeForm(); // Close the form
        });
      };
    

    return (
        <Box mt={3}>
            <UserForm
                initialData={user} 
                isEditMode={true} 
                onSubmit={editUser}
            />
        </Box>
    );
}

export default EditDetails;

EditDetails.propTypes={
    closeForm: PropTypes.func,
    onUpdate: PropTypes.func,
}
