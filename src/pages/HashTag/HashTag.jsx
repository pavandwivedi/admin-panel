import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect } from 'react';
import axios from 'axios';

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

  // const handleAdd = () => {
  //   if (editIndex !== null) {
  //     const updatedHashtag = [...hashtags];
  //     updatedHashtag[editIndex].name = hasgTag;
  //     setHashTags(updatedHashtag);
  //   } else {
  //     setHashTags([...hashtags, { name: hasgTag }]);
  //   }
  //   handleClose();
  // };

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
      const response = await axios.post('http://157.173.222.27:5000/api/v1/tags/add-tag', { tags: [hasgTag] }, config);
      setHashTag([...hashtags, response.data]);
      console.log(response);
    } catch (error) {
      console.error('Error adding hashtag:', error);
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

  const fetchHashTags = async () => {
    try {
      const response = await axios.get('http://157.173.222.27:5000/api/v1/tags/get-all');
      console.log(response.data.tags);
      setHashTags(response.data.tags);
    } catch (error) {
      console.error('Error fetching hashtags data:', error);
    }
  };

  useEffect(() => {
    fetchHashTags();
  }, [hasgTag]);


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
                <TableCell>{category.tag}</TableCell>
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
