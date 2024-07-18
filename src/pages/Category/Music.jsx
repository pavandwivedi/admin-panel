import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Music = () => {
  const [music, setMusic] = useState([]);
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
      const updatedMusic = [...music];
      updatedMusic[editIndex].name = categoryName;
      setMusic(updatedMusic);
    } else {
      setMusic([...music, { name: categoryName }]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setCategoryName(music[index].name);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedMusic = [...music];
    updatedMusic.splice(index, 1);
    setMusic(updatedMusic);
  };

  return (
    <div>
      <Button variant="contained" sx={{bgcolor:'#f26939'}} onClick={handleOpen}>
        Add music
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Musics' : 'Add Musics'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Music Name"
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
                  <TableCell  sx={{fontSize:'20px',fontWeight:'bold'}}>Music Name</TableCell>
              <TableCell  sx={{fontSize:'20px',fontWeight:'bold'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {music.map((category, index) => (
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

export default Music;
