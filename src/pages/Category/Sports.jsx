import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Sports = () => {
  const [sport, setSport] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => {
    setCategoryName('');
    setEditIndex(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (editIndex !== null) {
      const updatedSport = [...sport];
      updatedSport[editIndex].name = categoryName;
      setSport(updatedSport);
    } else {
      setSport([...sport, { name: categoryName }]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setCategoryName(sport[index].name);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedSport = [...sport];
    updatedSport.splice(index, 1);
    setSport(updatedSport);
  };

  return (
    <div>
      <Button variant="contained" sx={{bgcolor:'#f26939'}} onClick={handleOpen}>
        Add sport
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Sports' : 'Add Sports'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="sport Name"
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
          <Button onClick={handleAdd} color="primary">
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{mt: 5}}>
        <Table>
          <TableHead>
            <TableRow>                 
                  <TableCell  sx={{fontSize:'20px',fontWeight:'bold'}}>Sport Name</TableCell>
              <TableCell  sx={{fontSize:'20px',fontWeight:'bold'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sport.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)} color="primary">
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
