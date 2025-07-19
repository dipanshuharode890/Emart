import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaCartArrowDown } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import useWindowWidth from './useWindowWidth';

import loader from '../../assets/loader_gif.bin';

function Shop({ hideLoadMore = false, hideHeader = false }) {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const exists = cart.some(item => item.id === product.id);

        if (!exists) {
            const updateCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem('cartItems', JSON.stringify(updateCart));
            toast.success('✅ Item added to cart');
        } else {
            toast.warning('⚠️ Item already in cart');
        }
        setTimeout(() => {
            navigate('/cart');
        }, 1000);
    };

    const width = useWindowWidth();
    const wordLimit = width < 640 ? 2 : 4;

    if (loading) return <img src={loader} alt="" />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            {/* Page Section */}
            {/* Conditionally show headerpage */}
            {!hideHeader && visibleCount < products.length && (
                <div className="w-full bg-yellow-100 py-2 px-[4%] lg:px-[8%]">
                    <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
                        <Link to='/' className="hover:underline text-gray-700 font-medium">Home</Link>
                        <span className="text-gray-500">&nbsp; / &nbsp;</span>
                        <span className="text-red-900 font-semibold">Shop</span>
                    </div>
                </div>
            )}

            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4"></h2>

                <div className='grid products-warp grid-cols-2 md:grid-cols-4 gap-3'>
                    {products.slice(0, visibleCount).map((product, index) => {
                        const isOffer = index % 5 === 0;
                        const originalPrice = Math.round(product.price * 83);
                        const discount = isOffer ? 15 : 0;
                        const finalPrice = originalPrice - Math.floor((originalPrice * discount) / 100);

                        return (
                            <div key={product.id} className='bg-white shadow-md rounded-xl p-2 flex flex-col items-start hover:shadow-xl transition duration-300 group border border-gray-100 cursor-pointer'>
                                {isOffer && (
                                    <p className='text-[8px] text-white font-bold mb-1 bg-green-600 px-2 py-1 rounded'>
                                        Special Offer - {discount}% OFF
                                    </p>
                                )}
                                <p className='text-xs text-white font-bold mb-1 bg-red-600 px-2 py-1 rounded'>{product.category}</p>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className='w-4/5 h-28 object-contain group-hover:scale-105 transition-transform duration-300'
                                    onClick={() => navigate(`/product/${product.id}`)}
                                />
                                <h4
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    title={product.title}
                                    className='text-lg font-medium mt-2 truncate text-yellow-800 hover:underline line-clamp-2'
                                >
                                    {/* {product.title.split(" ").slice(0, 5).join(" ")}{product.title.split(" ").length > 5 && '...'} */}
                                    {product.title.split(" ").slice(0, wordLimit).join(" ")}
                                    {product.title.split(" ").length > wordLimit && '...'}
                                </h4>
                                <div className="flex mt-3 flex-row items-center justify-between w-full">
                                    {discount > 0 ? (
                                        <div className='mt-1 text-md'>
                                            <span className='line-through text-gray-400'> ₹{originalPrice}</span>{"  "}
                                            <span className='text-red-600 font-bold'> ₹{finalPrice}</span>
                                        </div>
                                    ) : (
                                        <div className='text-lg font-semibold mt-1'> ₹{originalPrice}</div>
                                    )}
                                    <button
                                        className='bg-yellow-400 text-white rounded-full w-[35px] h-[35px] hover:bg-red-500 hover:shadow-xl transition'
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <FaCartArrowDown className='ml-2' />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Conditionally show Load More button */}
                {!hideLoadMore && visibleCount < products.length && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 4)}
                            className="bg-yellow-400 text-white px-6 py-2 rounded-md hover:bg-yellow-500 font-semibold transition"
                        >
                            Load More
                        </button>
                    </div>
                )}

                <ToastContainer position='top-right' autoClose={1500} />
            </div>
        </>
    )
}

export default Shop