import React from 'react'
import { Box, Button, Card, CardContent, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MaleIcon from '@mui/icons-material/Male';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from "../../assets/Logo.png";

const genderOptions = [
  { value: 'Male' },
  { value: 'Female' },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  address: Yup.string().required('Address is required'), 
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',     
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {        
        console.log('Form submitted successfully:', firstName);
        navigate('/');
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <Grid p={2} container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: "#0dbbdb54" }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}> 
          <img src={logo} height={55} width={80}/>           
              <Typography variant='h4' sx={{ fontWeight: 'bold', color: "black" ,mt: 2}}>
                Sign Up
              </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={5} mt={0}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
            </Grid>
            <Grid container mt={4}>              
              <Grid item xs={12} sm={12} md={12} lg={12} >
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>         
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>            
            </Grid>
            <Grid mt={2} container sx={{ display: 'grid', justifyContent: 'center' }}>
              <Button fullWidth variant="contained" style={{  width: "150px",backgroundColor: "#f26939" , "&:hover": { bgcolor: '#f26939d9' }}} type="submit">
                Register
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default SignUp;
