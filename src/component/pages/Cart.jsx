import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2';

function Cart() {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (storedItems.length === 0) return;

    // Fetch all product details using API
    Promise.all(
      storedItems.map(item => axios.get(`https://fakestoreapi.com/products/${item.id}`))
    ).then(responses => {
      // Merge fetched data with stored quantity
      const productsWithQuantity = responses.map((res, i) => ({
        ...res.data,
        quantity: storedItems[i].quantity || 1
      }));
      setCart(productsWithQuantity);
    }).catch(err => {
      toast.error("Failed to load cart items");
      console.error(err);
    });
  }, []);


  const updatedQuantity = (id, delta) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);

    // Update localStorage with new quantities
    const updatedIds = updatedCart.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem('cartItems', JSON.stringify(updatedIds));
  };


  const removeFromCart = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      text: "Do you want to remove this item from Cart ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        const updatedIds = updatedCart.map(({ id, quantity }) => ({ id, quantity }));
        localStorage.setItem('cartItems', JSON.stringify(updatedIds));
        toast.success('Item removed from cart');
      }
    });
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toLowerCase();
    if (code === 'freeship10') {
      setDiscount(10);
      toast.success("10% discount applied!");
    } else {
      setDiscount(0);
      toast.warning("Invalid coupon code");
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * 83 * item.quantity), 0);
  const shipping = subtotal > 0 && subtotal < 1000 ? 90 : 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount + shipping;

  const handlePlaceOrder = () => {
    navigate('/checkout', {
      state: {
        cartItems: cart,
        summary: { subtotal, shipping, discountAmount, total }
      }
    });
  };

  return (
    <div className="px-4 sm:px-8 lg:px-[8%] py-10 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-yellow-600">My Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty.
          <div className='mt-10 text-center'>
            <Link
              to='/shop'
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-yellow-500 border border-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white transition-all">
              <FaArrowLeftLong /> Continue Shopping
            </Link>
          </div>
        </div>

      ) : (
        <>
          <ToastContainer position='top-right' autoClose={1500} />
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4">
                <img src={item.image} alt={item.title} className="h-40 w-full object-contain mb-4" />
                <h2 className="font-semibold text-lg">{item.title.split(" ").slice(0, 4).join(" ")}{item.title.split(" ").length > 4 && '...'}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-blue-600 font-bold mt-2">₹{Math.round(item.price * 83)}</p>

                <div className="flex items-center mt-4 gap-2">
                  <button
                    onClick={() => updatedQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => updatedQuantity(item.id, 1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >+</button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 w-full flex justify-center gap-[2rem] items-center bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  <FaTrashAlt /> Remove
                </button>

              </div>
            ))}
          </div>

          {/* Coupon and total section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount:</span>
                <span>-₹{discountAmount.toFixed(0)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{total.toFixed(0)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;