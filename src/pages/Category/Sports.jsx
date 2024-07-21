import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const Sports = () => {
  const [sports, setSports] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOpen = () => {
    setCategoryName('');
    setEditIndex(null);
    setOpen(true);
  };

  const handleEditOpen = (index) => {
    setCategoryName(sports[index].name);
    setEditIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.token}` }
      };
      const response = await axios.post('http://157.173.222.27:5000/api/v1/interest/add-new', { sports: [categoryName] }, config);
      setSports([...sports, response.data]);
      console.log(response);
    } catch (error) {
      console.error('Error adding sport:', error);
    }
    handleClose();
  };

  const handleEdit = async () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.token}` }
      };

      await axios.put(`http://157.173.222.27:5000/api/v1/interest/${sports[editIndex]._id}`, { category: 'Sports', newName: categoryName }, config);
      const updatedSports = [...sports];
      updatedSports[editIndex].name = categoryName;
      setSports(updatedSports);
    } catch (error) {
      console.error('Error updating sport:', error);
    }
    handleClose();
  };

  const handleDelete = async (index) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.token}` }
      };

      await axios.delete(`http://157.173.222.27:5000/api/v1/interest/delete/${sports[index]._id}`, {
        headers: config.headers,
        data: { category: "Sports" }
      });

      const updatedSports = [...sports];
      updatedSports.splice(index, 1);
      setSports(updatedSports);
    } catch (error) {
      console.error('Error deleting sport:', error);
    }
  };

  const fetchSports = async () => {
    try {
      const response = await axios.get('http://157.173.222.27:5000/api/v1/interest');
      console.log(response.data.interests[0].Sports);
      setSports(response.data.interests[0].Sports);
    } catch (error) {
      console.error('Error fetching sports data:', error);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <div>
      <Button variant="contained" sx={{bgcolor:'#f26939'}} onClick={handleAddOpen}>
        Add Sport
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Sport' : 'Add Sport'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Sport Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editIndex !== null ? handleEdit : handleAdd} color="primary">
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{mt: 5}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize:'20px',fontWeight:'bold'}}>Sport Name</TableCell>
              <TableCell sx={{fontSize:'20px',fontWeight:'bold'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sports.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOpen(index)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Sports;
