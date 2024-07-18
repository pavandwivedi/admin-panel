import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, IconButton,
  Typography
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';

const columns = [
  { id: 'sno', label: 'S.No', minWidth: 50 },
  { id: 'Name', label: 'Name', minWidth: 100 }, 
  { id: 'gender', label: 'Gender', minWidth: 50 },
  { id: 'phone', label: 'phone', minWidth: 150 },
  { id: 'age', label: 'Age', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'image', label: 'Image', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const config = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    return {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      },
    };
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://157.173.222.27:5000/api/v1/user/all', config());
      console.log("Users fetched", response.data);
      if (Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        console.error("Error: Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (id) => {
    console.log(`Viewing user ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing user ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting user ${id}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: 'auto' }}>
      <Typography variant='h5' sx={{ p: 2, fontWeight: 'bold' }}>All Users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>
                    <img src={user.profileimage} alt="user" width="50" />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(user._id)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(user._id)}>
                      <Edit sx={{ color: 'blue' }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user._id)}>
                      <Delete sx={{ color: 'red' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AllUser;
