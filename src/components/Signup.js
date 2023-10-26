import React, { useState , useEffect} from 'react';
import { Button, TextField, Typography, Grid, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import * as CookieManager from '../cookieManager';


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword === "") {
        setPasswordsMatch(true);
    } else {
        setPasswordsMatch(password === confirmPassword);
    }
}, [password, confirmPassword]);

  const handleSignup = () => {  
    api.post("signup",{
      email: email,
      password: password,
      confirmPassword: confirmPassword
  }, { bypassInterceptor: true })
    .then(response => {
      const data = response.data
      if (data.success) {
        console.log("signup response received success")
        setErrorMessage(""); // Clear any previous error messages
        CookieManager.setAccessToken(data.access_token);
        CookieManager.setRefreshToken(data.refresh_token);
        navigate('/welcome'); // redirect to the blank page
      } else {
        console.log("signup response received error")
        setErrorMessage(data.message);
      }
  })
  .catch(error => {
    console.log("signup error", error)
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
          error={!passwordsMatch}
          helperText={!passwordsMatch && "Passwords do not match"}
        />
        {errorMessage && (
          <Typography variant="body2" color="error" align="center">
              {errorMessage}
          </Typography>
        )}
      <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: 10, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }} 
          onClick={handleSignup}
          disabled={!passwordsMatch || !email || !password || !confirmPassword}
      >
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
