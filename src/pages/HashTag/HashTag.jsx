import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const HashTag = () => {
  const [hashtags, setHashTags] = useState([]);
  const [open, setOpen] = useState(false);
  const [hasgTag, setHashTag] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => {
    setHashTag('');
    setEditIndex(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (editIndex !== null) {
      const updatedHashtag = [...hashtags];
      updatedHashtag[editIndex].name = hasgTag;
      setHashTags(updatedHashtag);
    } else {
      setHashTags([...hashtags, { name: hasgTag }]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setHashTag(hashtags[index].name);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedHashtag = [...hashtags];
    updatedHashtag.splice(index, 1);
    setHashTags(updatedHashtag);
  };

  return (
    <div>
      <Button variant="contained" sx={{bgcolor:'#f26939'}} onClick={handleOpen}>
        Add HashTag
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit HashTag' : 'Add HashTag'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="HashTag Name"
            type="text"
            fullWidth
            value={hasgTag}
            onChange={(e) => setHashTag(e.target.value)}
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
                  <TableCell  sx={{fontSize:'20px',fontWeight:'bold'}}>Category Name</TableCell>
              <TableCell  sx={{fontSize:'20px',fontWeight:'bold'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hashtags.map((category, index) => (
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

export default HashTag;
