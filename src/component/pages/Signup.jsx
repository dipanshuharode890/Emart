
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    address: '',
    street: '',
    pincode: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePincode = async e => {
    const pincode = e.target.value;
    setFormData(prev => ({ ...prev, pincode }));

    if (pincode.length === 6) {
      try {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = res.data[0];
        if (data.Status === 'Success') {
          setFormData(prev => ({
            ...prev,
            city: data.PostOffice[0].District,
            state: data.PostOffice[0].State
          }));
        } else {
          setError('Invalid PIN code');
        }
      } catch {
        setError('Failed to fetch location');
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    localStorage.setItem('user', JSON.stringify(formData));
    setSuccess('Signup successful!');
    setError('');
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="mobile" maxLength={10}  placeholder="Mobile No." required onChange={handleChange} className="border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="address" placeholder="Address" required onChange={handleChange} className="border p-2 rounded md:col-span-2" />
        <input type="text" name="street" placeholder="Street, Block, House no." required onChange={handleChange} className="border p-2 rounded md:col-span-2" />
        <input type="text" name="pincode" maxLength={6} placeholder="Pincode" required onChange={handlePincode} className="border p-2 rounded" />
        <input type="text" name="city" value={formData.city} readOnly className="border p-2 rounded" placeholder="City" />
        <input type="text" name="state" value={formData.state} readOnly className="border p-2 rounded" placeholder="State" />
        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required onChange={handleChange} className="border p-2 rounded" />
        <input type={showPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} className="border p-2 rounded" />
        <div className="md:col-span-2 flex items-center">
          <input type="checkbox" onChange={() => setShowPassword(prev => !prev)} className="mr-2" /> Show Password
        </div>
        <button onClick={() => navigate('/login')} type="submit" className="md:col-span-2 bg-yellow-400 text-white py-2 rounded">Signup</button>
        {error && <p className="text-red-500 md:col-span-2">{error}</p>}
        {success && <p className="text-green-500 md:col-span-2">{success}</p>}
      </form>
    </div>
  );
}

export default Signup;
