import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    api.post("login", {
      email: email,
      password: password
    }, { bypassInterceptor: true })
    .then(response => {
        const data = response.data;
        if (data.success) {
          console.log("login response received success")
          // After receiving tokens from server
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);

          setErrorMessage("");
          navigate("/dashboard");
        }
    })
    .catch(error => {
     if (error.response && error.response.status === 403) {
        const errorMessage = error.response.data.message;
        console.log(error)
        setErrorMessage(errorMessage || "Login failed");  // Display the message from server or a default one
      } else {
        console.log("login error", error);
      }
    });
};


return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(180deg, #B0E0E6, #FFFFFF)' }}>
    <Grid container direction="column" spacing={3} style={{ maxWidth: 400, padding: 20, paddingTop: 0, paddingLeft:0, borderRadius: 15, boxShadow: '0 3px 10px rgba(0,0,0,0.2)', backgroundColor: 'white' }}>
      <Grid item style={{ marginBottom: 0 }}>
        <Typography variant="h4" align="center">
          🌐 Jenna
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
        Don't have an account? <Link href="/signup">Sign up for free</Link>
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<GoogleIcon />} fullWidth>
          Sign in with Google
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" startIcon={<AppleIcon />} fullWidth>
          Sign in with Apple
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Or
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <Typography variant="body2" color="error" align="center">{errorMessage}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 10, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Continue
        </Button>

      </Grid>
    </Grid>
  </div>
);
}

export default Login;
