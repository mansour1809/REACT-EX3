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
  Button,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
// import { useState } from 'react';

// export default function SystemAdmin() {
//   const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));

//   // אפשרות 1: עם DataGrid
//   const columns = [
//     { field: 'username', headerName: 'שם משתמש', width: 130 },
//     { field: 'email', headerName: 'אימייל', width: 180 },
//     { field: 'firstName', headerName: 'שם פרטי', width: 130 },
//     { field: 'lastName', headerName: 'שם משפחה', width: 130 },
//     {
//       field: 'actions',
//       headerName: 'פעולות',
//       width: 180,
//       renderCell: (params) => (
//         <>
//           <button onClick={() => handleEdit(params.row)}>עדכן</button>
//           <button onClick={() => handleDelete(params.row)}>מחק</button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <DataGrid
//       rows={users}
//       columns={columns}
//       pageSize={5}
//       rowsPerPageOptions={[5]}
//     />
//   );
// }
export default function SystemAdmin() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));

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
console.log(users)
  return (
    <>
       <TableContainer component={Paper} sx={{ maxWidth: '90%', margin: '2rem auto' }}>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell align="center" sx={{ width: '10%' }}></TableCell>
             <TableCell align="right" sx={{ width: '25%' }}>אימייל</TableCell>
             <TableCell align="right" sx={{ width: '15%' }}>תאריך לידה</TableCell>
             <TableCell align="right" sx={{ width: '15%' }}>כתובת</TableCell>
             <TableCell align="right" sx={{ width: '15%' }}>שם מלא</TableCell>
             <TableCell align="right" sx={{ width: '20%' }}>שם משתמש</TableCell>
           </TableRow>
         </TableHead>
         {users.length > 0 ? (

         <TableBody>
           {users.map((user) => (
             <TableRow key={user.email} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
               <TableCell align="center" sx={{ width: '10%' }}>
                 <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                   <IconButton
                     sx={{ 
                       width: 30,
                       height: 30,
                       backgroundColor: 'primary.main',
                       '&:hover': { backgroundColor: 'primary.dark' },
                       color: 'white'
                     }}
                   >
                     <EditIcon sx={{ fontSize: 16 }} />
                   </IconButton>
                   <IconButton
                     sx={{ 
                       width: 30,
                       height: 30,
                       backgroundColor: 'error.main',
                       '&:hover': { backgroundColor: 'error.dark' },
                       color: 'white'
                     }}
                     onClick={()=>handleDelete(user)}
                   >
                     <DeleteIcon sx={{ fontSize: 16 }} />
                   </IconButton>
                 </Box>
               </TableCell>
               <TableCell align="right" sx={{ width: '25%' }}>{user.email}</TableCell>
               <TableCell align="right" sx={{ width: '15%' }}>{user.birthDate}</TableCell>
               <TableCell align="right" sx={{ width: '15%' }}>{`${user.street} ${user.number}, ${user.city}`}</TableCell>
               <TableCell align="right" sx={{ width: '15%' }}>{`${user.firstName} ${user.lastName}`}</TableCell>
               <TableCell align="right" sx={{ width: '20%' }}>{user.username}</TableCell>
             </TableRow>
           ))}
         </TableBody>
        ) : (
          <>
          <TableCell align="center" sx={{ width: '100%' }}>לא נמצאו משתמשים</TableCell>
          <TableCell align="center" sx={{ width: '100%' }}>לא נמצאו משתמשים</TableCell>
          <TableCell align="center" sx={{ width: '100%' }}>לא נמצאו משתמשים</TableCell>
          <TableCell align="center" sx={{ width: '100%' }}>לא נמצאו משתמשים</TableCell>
          <TableCell align="center" sx={{ width: '100%' }}>לא נמצאו משתמשים</TableCell>
          <TableCell align="center" sx={{ width: '100%' }}>לא נמצאו משתמשים</TableCell>
        </>
      )}
       </Table>
      </TableContainer>
      
    </>
  );
}
