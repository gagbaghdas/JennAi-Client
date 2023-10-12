import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // Define the API endpoint
    const apiEndpoint = process.env.API_URL + "signup";

    // Make the API request
    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle successful signup (e.g., redirect to login page or dashboard)
        } else {
            // Handle signup error (e.g., show error message)
        }
    })
    .catch(error => {
        // Handle fetch error (e.g., network issue)
    });
};

return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(180deg, #B0E0E6, #FFFFFF)' }}>
    <Grid container direction="column" spacing={3} style={{ maxWidth: 400, padding: 20, borderRadius: 15, paddingLeft: 0 , boxShadow: '0 3px 10px rgba(0,0,0,0.2)', backgroundColor: 'white' }}>
      <Grid item>
        <Typography variant="h4" align="center">
          🌐 Jenna
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Already have an account? <Link href="/login">Sign in</Link>
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<GoogleIcon />} fullWidth>
          Sign up with Google
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" startIcon={<AppleIcon />} fullWidth>
          Sign up with Apple
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
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth style={{ marginTop: 10, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }} onClick={handleSignup}>
          Signup
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="caption" align="center" display="block">
          By signing up, you agree to the <Link href="#">Terms and Conditions</Link> and <Link href="#">Privacy Policy</Link>.
        </Typography>
      </Grid>
    </Grid>
  </div>
);
}

export default Signup;
