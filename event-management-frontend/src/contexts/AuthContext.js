import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    loadUser();
  };

  const register = async (email, password) => {
    await axios.post('/api/auth/register', { email, password });
  };

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('/api/auth/user', { headers: { 'x-auth-token': token } });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadUser(); }, []);

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);