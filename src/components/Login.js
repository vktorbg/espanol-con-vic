import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('✅ Redirecting to dashboard...');
      navigate('/dashboard');
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      console.log('✅ Login successful, waiting for redirect...');
    } catch (err) {
      console.error('❌ Login error:', err.message);
      setError(err.message); // Asegúrate de que error sea una cadena de texto
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Renderiza error como cadena de texto */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
