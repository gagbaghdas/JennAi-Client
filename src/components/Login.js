import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Define the API endpoint
    const apiEndpoint = process.env.API_URL + "login";

    // Make the API request
    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle successful login (e.g., redirect to dashboard)
        } else {
            // Handle login error (e.g., show error message)
        }
    })
    .catch(error => {
        // Handle fetch error (e.g., network issue)
    });
};


  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <button>Google Sign-in</button>
      <button>Apple Sign-in</button>
    </div>
  );
}

export default Login;
