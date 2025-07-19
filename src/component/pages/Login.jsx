// --- Login.jsx ---
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ✅ Import the hook

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Use login from context

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser?.mobile === mobile && storedUser?.password === password) {
      login(storedUser); // ✅ Login user with full user data
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-8 max-w-sm mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Mobile Number"
          maxLength={10}
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={() => setShowPassword(prev => !prev)}
            className="mr-2"
          />
          Show Password
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-yellow-400 text-white py-2 rounded">
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-blue-500 mt-2"
        >
          Forgot Password?
        </button>
        <div>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-sm text-red-500 mt-2"
          >
            Create Account OR Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
