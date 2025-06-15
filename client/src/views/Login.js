import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

const Login = observer(({ authViewModel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authViewModel.login(email, password);
    
    if (authViewModel.token) {
      if (authViewModel.passwordChangeRequired) {
        navigate('/change-password');
      } else {
        navigate('/grades');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {authViewModel.error && <div className="error">{authViewModel.error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={authViewModel.loading}>
          {authViewModel.loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
});

export default Login;