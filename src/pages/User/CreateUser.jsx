import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Select, MenuItem, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { CountryDropdown } from 'react-country-region-selector';


const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    country: '',
    motive: '',
    age: '',
    profileimage: null,
    dob: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, profileimage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleCountryChange = (value) => {
    setFormData({ ...formData, country: value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://157.173.222.27:5000/api/v1/user/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Make sure formData is an object with the required fields
      });
      console.log(response);
      const data = await response.json();
  
      if (response.ok) {
        // Registration successful
        console.log('User registered:', data);
        setOpenSnackbar(true);
      } else {
        // Handle errors
        console.error('Registration error:', data.message);
        // Optionally, set an error message in the state to display it in the UI
      }
    } catch (error) {
      console.error('Network error:', error);
      // Optionally, set an error message in the state to display it in the UI
    }
  };

  const handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Register User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="First Name"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            type='number'
              name="phone"
              label="Phone No"
              fullWidth
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="motive"
              label="Motive"
              fullWidth
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
                <CountryDropdown
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  classes="my-custom-select"
                  style={{
                    height: '50px',
                    width: '100%',
                    border: '1px solid #c4c4c4',
                    borderRadius: '4px',
                    color: 'grey',
                  }}

                />            
          </Grid>          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>                          
          <Grid item xs={12} sm={6}>
            <TextField
              name="dob"
              label="Date of Birth"
              type="date"
              fullWidth
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            type='number'
              name="age"
              label="Age"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              
            >
              Upload Image
              <input
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            {formData.profileimage && (
              <Typography variant="body2" gutterBottom>
                {formData.profileimage.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sx={{display:'grid',justifyContent:'center'}}>
            <Button type="submit" variant="contained" sx={{width:'180px',bgcolor:"#f26939", "&:hover": { bgcolor: '#f26939d9' } }} onClick={handleSubmit}  >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          User registered successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateUser;
