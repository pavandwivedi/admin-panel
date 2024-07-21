import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, IconButton, Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';

const columns = [
  { id: 'sno', label: 'S.No', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'gender', label: 'Gender', minWidth: 50 },
  { id: 'phone', label: 'Phone', minWidth: 150 },
  { id: 'age', label: 'Age', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'image', label: 'Image', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleEditSave = async () => {
    if (!selectedUser) return;

    try {
      await axios.put(`http://157.173.222.27:5000/api/v1/user/update-profile/${selectedUser._id}`, selectedUser, config());
      setUsers(users.map(user => user._id === selectedUser._id ? selectedUser : user));
    } catch (error) {
      console.error('Error updating user:', error);
    }

    handleEditClose();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://157.173.222.27:5000/api/v1/user/delete-profile/${id}`, config());
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleViewClose = () => {
    setOpenViewDialog(false);
    setSelectedUser(null);
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
                    <IconButton onClick={() => handleView(user)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(user)}>
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

      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={selectedUser?.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Gender"
            type="text"
            fullWidth
            name="gender"
            value={selectedUser?.gender || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            name="phone"
            value={selectedUser?.phone || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            name="age"
            value={selectedUser?.age || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Country"
            type="text"
            fullWidth
            name="country"
            value={selectedUser?.country || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openViewDialog} onClose={handleViewClose}>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <Typography variant="h6">Name: {selectedUser.name}</Typography>
              <Typography variant="body1">Gender: {selectedUser.gender}</Typography>
              <Typography variant="body1">Phone: {selectedUser.phone}</Typography>
              <Typography variant="body1">Age: {selectedUser.age}</Typography>
              <Typography variant="body1">Country: {selectedUser.country}</Typography>
              <Typography variant="body1">Profile Image:</Typography>
              <img src={selectedUser.profileimage} alt="user" width="150" />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AllUser;
