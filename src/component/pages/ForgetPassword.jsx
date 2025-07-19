// --- ForgotPassword.jsx ---
import React, { useState } from 'react';

function ForgotPassword() {
  const [mobile, setMobile] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = e => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.mobile === mobile) {
      storedUser.password = newPassword;
      localStorage.setItem('user', JSON.stringify(storedUser));
      setMessage('Password updated successfully!');
    } else {
      setMessage('Mobile number not found');
    }
  };

  return (
    <div className="p-8 max-w-sm mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input type="text" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} required className="w-full border p-2 rounded" />
        <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-yellow-400 text-white py-2 rounded">Reset Password</button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
