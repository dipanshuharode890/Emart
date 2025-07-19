import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { FaRegHeart, FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Wishlist() {
    const [wishlistIds, setWishlistIds] = useState([]);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedIds = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        if (storedIds.length === 0) return;

        Promise.all(storedIds.map(id =>
            axios.get(`https://fakestoreapi.com/products/${id}`)
        ))
            .then(responses => {
                const data = responses.map(res => res.data);
                setWishlistProducts(data);
            })
            .catch(err => {
                toast.error("Failed to load wishlist items");
                console.error(err);
            });
    }, []);


    const removeFromWishlist = (id) => {
        Swal.fire({
            title: "Are You Sure?",
            text: "Do you want to remove this item from wishlist?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedIds = wishlistIds.filter(itemId => itemId !== id);
                const updatedProducts = wishlistProducts.filter(product => product.id !== id);
                setWishlistIds(updatedIds);
                setWishlistProducts(updatedProducts);
                localStorage.setItem('wishlistItems', JSON.stringify(updatedIds));
                toast.success('Item removed from wishlist');
            }
        });
    };

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const exists = cart.some(item => item.id === product.id);
        if (!exists) {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            toast.success("Item added to Cart");
        } else {
            toast.error("Item already in cart");
        }
        setTimeout(() => {
            navigate('/cart');
        }, 1000);
    };

    return (
        <div className="w-full px-4 sm:px-8 py-6 bg-white text-gray-800">
            <Toaster position='top-right' reverseOrder={false} />
            <h1 className='text-3xl font-bold text-center mb-8 flex justify-center items-center gap-2'>
                <FaRegHeart className='text-pink-500' /> My Wishlist
            </h1>

            {wishlistProducts.length === 0 ? (
                <p className="text-center text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {wishlistProducts.map((item) => (
                        <div key={item.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition-all">
                            <img src={item.image} alt={item.title} className="w-full h-40 object-contain mb-4" onClick={() => navigate(`/product/${item.id}`)}/>
                            <h2 className="text-lg font-semibold">{item.title.split(" ").slice(0, 4).join(" ")}{item.title.split(" ").length > 4 && '...'}</h2>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <p className="font-bold text-blue-600 mb-4">₹{Math.round(item.price * 83)}</p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => addToCart(item)}
                                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    <FaShoppingCart /> Add to Cart
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    <FaTrashAlt /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className='mt-10 text-center'>
                <Link
                    to='/shop'
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-yellow-500 border border-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white transition-all">
                    <FaArrowLeftLong /> Continue Shopping
                </Link>
            </div>
        </div>
    );
}

export default Wishlist;
