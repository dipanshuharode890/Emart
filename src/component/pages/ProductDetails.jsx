import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../../assets/loader_gif.bin';
import brand1 from '../../assets/dell.png';
import brand2 from '../../assets/asus.png';
import brand3 from '../../assets/lenovo.png';
import brand4 from '../../assets/oppo.png';
import brand5 from '../../assets/panasonic.png';
import brand6 from '../../assets/samsung.png';
import brand7 from '../../assets/sanyo.png';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showZoom, setShowZoom] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isWishListed, setIsWishListed] = useState(false);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
                const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
                const exists = wishlist.some(item => item.id === res.data.id);
                setIsWishListed(exists);
            })
            .catch(err => {
                console.error(err);
                setError('Product not found');
                setLoading(false);
            });
    }, [id]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
    };

    const handleAddToWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        if (!wishlist.includes(product.id)) {
            wishlist.push(product.id);
            localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
            toast.success("Added to wishlist");
        } else {
            toast("Already in wishlist");
        }
        setTimeout(() => navigate('/wishlist'), 1000);
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            toast.warning("Item already in cart");
        } else {
            const updatedCart = [...cart, { id: product.id, quantity: 1 }];
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            toast.success("Item added to Cart");
            setTimeout(() => {navigate('/cart');}, 1000);
        }   
    };

    if (loading) return <img src={loader} alt="" />;
    if (error || !product) return <div className='p-10 text-center text-xl alert alert-danger'>Product Not Found</div>;

    const originalPrice = Math.round(product.price * 83);
    const discountedPrice = Math.floor(originalPrice * 0.85);

    return (
        <>
            <ToastContainer position='top-right' autoClose={1500} />
            {/* Page Section */}
            <div className="w-full bg-yellow-100 py-2 px-[4%] lg:px-[8%]">
                <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
                    <Link to='/' className="hover:underline text-gray-700 font-medium">Home</Link>
                    <span className="text-gray-500">&nbsp; / &nbsp;</span>
                    <span className="text-red-900 font-semibold">Product Details</span>
                </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col md:flex-row gap-10 px-[4%] lg:px-[8%] py-12">
                <div className="w-full md:w-1/2 flex gap-5 justify-between px-[50px] py-[25px] border rounded-xl shadow-md relative">
                    <div className="relative w-[250px] h-[250px] overflow-hidden rounded-xl shadow-md border cursor-pointer"
                        onMouseEnter={() => setShowZoom(true)}
                        onMouseLeave={() => setShowZoom(false)}
                        onMouseMove={handleMouseMove}>
                        <img src={product.image} alt={product.title} className='w-full h-full object-contain' />
                    </div>
                    {showZoom && (
                        <div className='w-[250px] h-[250px] border overflow-hidden hidden rounded-xl shadow-md md:block relative z-20'>
                            <img
                                src={product.image}
                                alt="Zoom"
                                className='absolute w-[500px] h-[500px] object-contain pointer-events-none'
                                style={{
                                    left: `-${mousePosition.x * 1.2}px`,
                                    top: `-${mousePosition.y * 2.5}px`,
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/2">
                    <p className="text-xs font-semibold bg-red-500 inline-block px-3 py-1 rounded text-white mb-4">{product.category}</p>
                    <h3 className='text-xl font-bold text-black mb-3'>{product.title}</h3>
                    <div className="text-xl font-bold text-red-600 mb-2">
                        ₹{discountedPrice}
                        <span className='text-gray-400 text-base line-through ml-3'> ₹{originalPrice}</span>
                    </div>
                    <p className='mb-3'>{product.description}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={handleAddToCart}
                            className='mt-3 px-3 text-sm py-1 rounded bg-red-500 text-white hover:bg-yellow-500 transition'>
                            Add To Cart
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className='mt-3 px-3 text-sm py-1 rounded bg-red-500 text-white hover:bg-yellow-500 transition'>
                            Add To Wishlist
                        </button>
                    </div>
                </div>
            </div>


            {/* Policys */}
            <div className="px-[4%] lg:px-[8%]">
                <h3 className='font-bold text-2xl mb-2'> Shiping Policy</h3>
                <p className='mb-2 text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugiat accusamus recusandae voluptates natus aspernatur velit doloribus tenetur quasi quisquam! Velit, totam aspernatur suscipit architecto molestias unde voluptas dolores saepe?</p>
                <p className='mb-2 text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugiat accusamus recusandae voluptates natus aspernatur velit doloribus tenetur quasi quisquam! Velit, totam aspernatur suscipit architecto molestias unde voluptas dolores saepe?</p>
                <p className='mb-1 text-xs'>Dispatch : Within 24 Hours</p>
                <p className='mb-1 text-xs'>Free Shipping accross all products on a minimum purchase of ₹1000</p>
                <p className='mb-1 text-xs'>Estimate Delivery Time 3-5 Days</p>
                <p className='mb-1 text-xs'>Cash on Delivery is also avaialable</p>
                <p className='mb-5 text-xs'>Easy 7 days returns and exchange Policy</p>

                <h3 className='font-bold text-2xl mb-2'> Returns Policy</h3>
                <p className='mb-2 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugiat accusamus recusandae voluptates natus aspernatur velit doloribus tenetur quasi quisquam! Velit, totam aspernatur suscipit architecto molestias unde voluptas dolores saepe?</p>
                <p className='mb-1 text-xs'>Estimate Delivery Time 3-5 Days</p>
                <p className='mb-1 text-xs'>Cash on Delivery is also avaialable</p>
                <p className='mb-1 text-xs'>Easy 7 days returns and exchange Policy</p>
            </div>

            {/* Add Review */}
            <div className="px-[4%] lg:px-[8%] pt-[50px]">
                <div className='px-[2%] pt-[20px] border rounded-2xl shadow-lg'>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 ">Add a Review </h2>
                    <form className='space-y-5 mb-5'>
                        <div>
                            <label className='block mb-1 text-sm font-semibold text-gray-700'>Your Name</label>
                            <input type="text" placeholder='Enter Your Name' className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400' />
                        </div>
                        <div>
                            <label className='block mb-1 text-sm font-semibold text-gray-700'>Rating</label>
                            <select
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
                                defaultValue="" >
                                <option value="" disabled>Select Rating</option>
                                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                <option value="4">⭐⭐⭐⭐ (4)</option>
                                <option value="3">⭐⭐⭐ (3)</option>
                                <option value="2">⭐⭐ (2)</option>
                                <option value="1">⭐ (1)</option>
                            </select>
                        </div>
                        <div>
                            <label className='block mb-1 text-sm font-semibold text-gray-700'>Your Review</label>
                            <textarea
                                rows="4"
                                type="text"
                                placeholder='Type Your Review'
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400' />
                        </div>
                        <button type='submit' className='bg-yellow-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-lg transition duration-300'>Submit Review</button>
                    </form>
                </div>
            </div>

            {/* Brands */}
            <div className='px-[4%] lg:px-[8%] py-8'>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{ delay: 2000 }}
                    breakpoints={{
                        1399: { slidesPerView: 5 },
                        1199: { slidesPerView: 5 },
                        991: { slidesPerView: 4 },
                        575: { slidesPerView: 3 },
                        0: { slidesPerView: 3 },
                    }}
                    modules={[Autoplay]}>
                    {[brand1, brand2, brand3, brand4, brand5, brand6, brand7].map((brand, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex items-center justify-center h-20">
                                <img src={brand} className='object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition' alt="brand" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default ProductDetails;
