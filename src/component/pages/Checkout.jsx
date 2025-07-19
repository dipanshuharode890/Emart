import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';


function Checkout() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    address: '',
    street: '',
    pincode: '',
    city: '',
    state: ''
  });

  const [error, setError] = useState('');
  const [editAddress, setEditAddress] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('cod');

  // 🧠 LOGIN CHECK
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  // 🛒 Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = storedCart.map(item => ({
      ...item,
      Price: parseFloat(item.Price),
      quantity: item.quantity || 1
    }));
    setCart(updatedCart);
  }, []);

  // 💡 Autofill user info
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobile: user.mobile || '',
        email: user.email || '',
        address: user.address || '',
        street: user.street || '',
        pincode: user.pincode || '',
        city: user.city || '',
        state: user.state || ''
      }));
    }
  }, [user]);

  const location = useLocation();
  const { summary } = location.state || {};

  // 📮 Pincode handler
  const handlePincodeChange = async (e) => {
    const pin = e.target.value;
    setFormData(prev => ({ ...prev, pincode: pin }));

    if (pin.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
        const data = response.data[0];
        if (data.Status === 'Success') {
          const post = data.PostOffice[0];
          setFormData(prev => ({
            ...prev,
            city: post.District,
            state: post.State
          }));
          setError('');
        } else {
          setError('Invalid pincode');
        }
      } catch {
        setError('Failed to fetch pincode info');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen px-5 py-10 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SECTION - Billing Info */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          {!editAddress ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Mobile:</strong> {formData.mobile}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Address:</strong> {formData.address}, {formData.street}, {formData.city} - {formData.pincode}, {formData.state}</p>
              <button className="text-blue-600 mt-3" onClick={() => setEditAddress(true)}>Edit Address</button>
            </div>
          ) : (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" className="border p-2 rounded" />
              <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" className="border p-2 rounded" />
              <input name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Mobile No." className="border p-2 rounded" />
              <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="border p-2 rounded" />
              <input name="address" value={formData.address} onChange={handleChange} required placeholder="Address" className="col-span-2 border p-2 rounded" />
              <input name="street" value={formData.street} onChange={handleChange} placeholder="Street, House No." className="border p-2 rounded" />
              <input name="pincode" value={formData.pincode} onChange={handlePincodeChange} maxLength="6" required placeholder="Pincode" className="border p-2 rounded" />
              <input name="city" value={formData.city} readOnly placeholder="City" className="border p-2 rounded bg-gray-100" />
              <input name="state" value={formData.state} readOnly placeholder="State" className="border p-2 rounded bg-gray-100" />
              {error && <p className="text-red-500 col-span-2">{error}</p>}
              <button type="button" className="col-span-2 bg-blue-600 text-white py-2 rounded mt-2" onClick={() => setEditAddress(false)}>Save Address</button>
            </form>
          )}

          {/* 🔐 Payment Options */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <label className="block mt-2">
              <input type="radio" name="payment" checked={selectedPayment === 'upi'} onChange={() => setSelectedPayment('upi')} />
              <span className="ml-2">UPI / Net Banking</span>
            </label>
            <label className="block">
              <input type="radio" name="payment" checked={selectedPayment === 'cod'} onChange={() => setSelectedPayment('cod')} />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>
        </div>

        {/* RIGHT SECTION - Order Summary */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{Math.round(summary?.subtotal)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>₹{Math.round(summary?.shipping)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount:</span>
            <span>-₹{Math.round(summary?.discountAmount)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>₹{Math.round(summary?.total)}</span>
          </div>

          <button
            className="mt-6 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
