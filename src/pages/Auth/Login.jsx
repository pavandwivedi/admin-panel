import React from "react";
import { Button, Card, CardContent, Grid, TextField, Typography, Box, FormControl, OutlinedInput, InputAdornment, IconButton, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import logo from "../../assets/Logo.png"
import { useAuth } from "../../components/layout/context";
import axios from "axios";

const styles = () => ({
  cover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    bgcolor: "#e0f7fa",
    '@media(maxWidth:600px)': {
      width: 'auto'
    }
  },
});

const Login = () => {
  // const classes = styles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const { auth, setAuth } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object({
    
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://157.173.222.27:5000/api/v1/admin/login", values, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        
        setAuth({
          user: response.data.admin,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify({
          user: response.data.admin,
          token: response.data.token,
        }));

        navigate("/admin/dashboard");
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: "#0dbbdb54" }}>
      <Grid item lg={4} md={5} sm={7} xs={12} >
        <Card>
          <CardContent>
            <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}> 
                <img src={logo} height={55} width={80}/>            
                <Typography variant='h5' sx={{ fontSize: '25px', fontWeight: '700', color: "Black" , pt: 2}}>
                  Login
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box mt={2}>
                <Typography sx={{ color: "black" }}>Email</Typography>
                <TextField
                  variant='outlined'
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Email'
                  fullWidth
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
              <Box mt={2}>
                <Typography sx={{ color: "black" }}>Password</Typography>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password' }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder='Password'
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}                  
                  />
                   {formik.touched.password && formik.errors.password && (
                  <Typography variant="caption" color="error">
                    {formik.errors.password}
                  </Typography>
                )}
                </FormControl>
              </Box>
              <Box sx={{ display: 'grid', justifyContent: 'end' }} mt={2}>
                <Typography sx={{ color: "black" }}>Forget Password?</Typography>
              
              </Box>
              <Box sx={{ display: 'grid', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "120px", color: 'white', marginTop: '15px', backgroundColor: '#f26939', "&:hover": { bgcolor: '#f26939d9' } }}
                    // onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
