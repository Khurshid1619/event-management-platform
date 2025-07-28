import React, { useState } from 'react';
import axios from 'axios';
import ParticlesBackground from '../components/ParticlesBackground'; // adjust path if needed

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });

      console.log('Registration successful:', response.data);
      setSuccessMsg('Registration successful! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Registration failed');
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
            background: 'rgba(21, 118, 159, 0.85)',
            color: '#fff',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            zIndex: 2,
          }}
        >
          <h2 className="text-center mb-4">Register</h2>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
            {successMsg && <p className="text-success small">{successMsg}</p>}

            <button type="submit" className="btn btn-success w-100" style={{ cursor: 'pointer' }}>
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            Already have an account? <a href="/login" className="text-info">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
