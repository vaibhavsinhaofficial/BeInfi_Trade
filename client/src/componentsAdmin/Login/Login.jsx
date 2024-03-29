import React, { useState } from "react";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import logo from "./images/adminlogo.svg";
import banner from "./images/payment.webp";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Login = () => {
  const { setIsLoginUser, setActive, setToggel, setRole } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginName, setloginName] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const result = await axios.post(`${baseUrl}/login`, formData, config);

      if (result.data.token && ((result.data.role === -1 && result.data.Status === 1) || (result.data.role === 1 && result.data.Status === 1) || (result.data.role === 2 && result.data.Status === 1))) {
        
        toast.success(<span style={{ fontWeight: 'bold', color: '#ff6600' }}>Hey {result.data.name}, Welcome To Ubankconnect</span>, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          closeButton: false
        });
        setloginName(result.data.name); // Set loginName state here
        // Inside the setTimeout function in the Login component
        setTimeout(() => {
          if (result.data.role === -1) {
            navigate("/bankconnect/Dashboard", { state: { loginName: result.data.name } });
          } else if (result.data.role === 1) {
            navigate("/bankconnect/Dashboard", { state: { loginName: result.data.name } });
          } else if (result.data.role === 2) {
            navigate("/bankconnect/SettlementDashboard", { state: { loginName: result.data.name } });
          }
         
          setIsLoginUser(result.data.token);
          setRole(result.data.role)
          localStorage.setItem("admin", result.data.token);
          localStorage.setItem("role", result.data.role);
          setToggel(true);
          setActive(-1);
        }, 2000);
      } else {
        toast.error(result.data.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${banner})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={logo}
              alt="logo_image"
              width="300px"
            />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "10px" }}
              >
                Log In
              </button>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                {'Copyright © '}
                <Link color="inherit" href="https://ubankconnect.com/">
                  UbankConnect
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
