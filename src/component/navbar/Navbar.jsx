import React, { useState, useEffect } from 'react';
import { BsGlobeCentralSouthAsia, BsPersonCircle } from 'react-icons/bs';
import { FaCartArrowDown, FaPhoneSquareAlt, FaRegHeart } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { IoFlashSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const categorise = [
        ['Smartphone', '📱'],
        ['Laptop', '💻'],
        ['Camera', '📷'],
        ['Headphones', '🎧'],
        ['Tablets', '📱'],
        ['PC Gaming', '🖥️'],
        ['Television', '📺'],
    ];

    const handleLogout = () => {
        logout(); // context logout clears token and updates isLoggedIn
        navigate('/login');
    };


    return (
        <nav className="w-full flex flex-col justify-center items-center relative">
            {/* Topbar */}
            <div className="top-nav w-full flex justify-between items-center px-[4%] lg:px-[8%] py-2 bg-black text-white text-sm">
                <div className="flex w-1/2 gap-5 items-center">
                    <p className="hide">Free Shipping On All Orders over ₹1000</p>
                </div>

                <ul className='flex gap-5 w-1/2 justify-end items-center'>
                    <li className='text-yellow-400 flex gap-1 items-center'>
                        <a href="#" className='flex gap-1'><IoFlashSharp /> Flash Sale</a>
                    </li>
                    {isLoggedIn ? (
                        <li className="flex gap-3 items-center text-yellow-400">
                            <BsPersonCircle />
                            <span className="capitalize font-semibold">{user?.firstName || 'User'}</span>
                            <button
                                onClick={logout}
                                className="hover:text-white text-sm border-l border-white pl-3 ml-3"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className='hover:text-yellow-400 flex gap-1 transition'>
                                    <BsPersonCircle /> Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className='hover:text-yellow-400 flex gap-1 transition'>
                                    <BsPersonCircle /> Signup
                                </Link>
                            </li>
                        </>
                    )}

                    <li>
                        <Link
                            to="/contact"
                            className="hover:text-yellow-400 flex gap-1 transition">
                            <BsGlobeCentralSouthAsia /> Contact
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Middle Navbar */}
            <div className="middle-nav w-full flex justify-between items-center px-[4%] lg:px-[8%] py-3 gap-8">
                <div className="w-1/3">
                    <Link to="/">
                        <h2 className="text-4xl font-bold text-black">
                            E<span className="text-yellow-500">-Mart</span>
                        </h2>
                    </Link>
                </div>
                <div className="product-search flex items-center h-10 border-2 border-yellow-500 rounded-md overflow-hidden">
                    <select className="bg-gray-100 font-semibold p-2 w-1/2 border-none outline-none">
                        <option>All Categories</option>
                        <option>Camera</option>
                        <option>Accessories</option>
                        <option>Camera & Lenses</option>
                        <option>Drones</option>
                        <option>Security Camera</option>
                        <option>Games</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search for products"
                        className="w-full px-2 py-1 outline-none font-medium bg-gray-100"
                    />
                    <button className="bg-yellow-500 text-white px-5 font-bold uppercase h-full">
                        Search
                    </button>
                </div>
                <div className="get-help flex gap-5 items-center w-1/3 justify-center">
                    <div className="flex gap-2 items-center">
                        <span className="text-2xl text-gray-500">
                            <FaPhoneSquareAlt />
                        </span>
                        <div className="flex flex-col text-xs">
                            <span className="text-gray-500">Need Help?</span>
                            <span className="text-yellow-600 font-bold">+91 9874563210</span>
                        </div>
                    </div>
                    <Link to="/wishlist" className="flex gap-2 items-center ">
                        <span className="text-3xl text-gray-500">
                            <FaRegHeart />
                        </span>
                        <div className="flex flex-col text-xs">
                            <span className="text-gray-500">My</span>
                            <span className="text-yellow-600 font-bold">Wishlist</span>
                        </div>
                    </Link>
                    <Link to="/cart" className="flex gap-2 items-center ">
                        <span className="text-3xl text-gray-500">
                            <FaCartArrowDown />
                        </span>
                        <div className="flex flex-col text-xs">
                            <span className="text-gray-500">My</span>
                            <span className="text-yellow-600 font-bold">Cart</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                className={`w-full px-[4%] lg:px-[8%] py-3 flex justify-between items-center gap-5 transition-all duration-500 ${menuOpen ? 'h-auto' : ''
                    }`}
            >
                <div className="relative w-1/5 hide">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xl">
                                <IoMdMenu />
                            </span>
                            <span className="font-bold">Shop Categories</span>
                        </div>
                    </div>
                    {open && (
                        <ul className="absolute top-full left-0 bg-white shadow-md rounded-md overflow-hidden mt-2 w-full z-40 transition-all duration-300">
                            {categorise.map(([label, icon], i) => (
                                <a
                                    href="#"
                                    key={i}
                                    className="flex items-center gap-3 px-4 py-2 border-b last:border-none hover:bg-gray-200"
                                >
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </a>
                            ))}
                        </ul>
                    )}
                </div>

                <ul className="flex gap-7 w-2/5 nav-menu font-bold">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-yellow-500 text-lg transition"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="hover:text-yellow-500 text-lg transition"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shop"
                            className="hover:text-yellow-500 text-lg transition"
                        >
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/blog"
                            className="hover:text-yellow-500 text-lg transition"
                        >
                            Blog
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/contact"
                            className="hover:text-yellow-500 text-lg transition"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                <Link to="/wishlist" className="flex items-center gap-2 hide">
                    <span className="text-2xl text-gray-600">
                        <FaRegHeart />
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-sm">Today's Deal</span>
                        <span className="bg-red-600 text-white text-xs px-2 pt-1 rounded-sm uppercase relative">
                            Hot
                        </span>
                    </div>
                </Link>

                {menuOpen && (
                    <span
                        onClick={toggleMenu}
                        className="text-2xl absolute top-4 right-4 cursor-pointer"
                    >
                        X
                    </span>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
