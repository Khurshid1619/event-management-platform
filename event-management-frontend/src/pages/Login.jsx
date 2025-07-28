import React, { useState } from 'react';
import axios from 'axios';
import ParticlesBackground from '../components/ParticlesBackground'; // Make sure path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      console.log('Login Success:', response.data);
      // localStorage.setItem('token', response.data.token);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="position-relative" style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <ParticlesBackground />

      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          backgroundColor: 'transparent',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <div
          className="card shadow-lg p-4 w-100"
          style={{
            maxWidth: '400px',
            background: 'rgba(181, 58, 179, 0.85)', // Dark with slight transparency
            color: '#fff',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(215, 26, 190, 0.2)',
            borderRadius: '20px',
            zIndex: 2,
          }}
        >
          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMsg && <p className="text-danger small">{errorMsg}</p>}

            <button type="submit" className="btn btn-primary w-100" style={{ cursor: 'pointer' }}>
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            Don’t have an account? <a href="/register" className="text-info">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
