import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

import heroImg from '../../assets/hero.png';
import heroImg2 from '../../assets/hero-2.png';
import heroImg3 from '../../assets/hero-3.png';

import banner1 from '../../assets/banner-1.jpg';
import banner2 from '../../assets/banner-2.jpg';
import banner3 from '../../assets/banner-3.jpg';
import banner4 from '../../assets/banner-4.jpg';
import banner5 from '../../assets/banner-5.jpg';

import brand1 from '../../assets/dell.png';
import brand2 from '../../assets/asus.png';
import brand3 from '../../assets/lenovo.png';
import brand4 from '../../assets/oppo.png';
import brand5 from '../../assets/panasonic.png';
import brand6 from '../../assets/samsung.png';
import brand7 from '../../assets/sanyo.png';

import ProductData from "../../Data.json";

import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shop from './Shop';

function Index() {

  const products = ProductData.Products;
  const specialOffer = products.find(p => p.Id === 7);

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  const handldAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const exists = cart.some(item => item.Id === product.Id);

    if (!exists) {
      const updateCart = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updateCart));
      toast.success('✅ Item added to cart')
    }
    else {
      toast.warning('⚠️ Item already in cart')
    }
    setTimeout(() => {
      navigate('/cart')
    }, 1000);
  }

  return (
    <>
      <div className="bg-element">
        <div className="hero-bg">
  <header className="px-4 sm:px-6 lg:px-16 py-10 sm:py-16">
    <Swiper
      slidesPerView={1}
      loop={true}
      modules={[Autoplay, EffectFade]}
      autoplay={{ delay: 3000 }}
      effect="fade"
      fadeEffect={{ crossFade: true }}
    >
      {[
        { title: 'SMARTWATCHS', price: '₹999', img: heroImg },
        { title: 'SMARTPHONES', price: '₹12999', img: heroImg2 },
        { title: 'SPEAKERS', price: '₹1799', img: heroImg3 },
      ].map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4">
                THE NEW <br className="hidden sm:block" /> STANDARD
              </h1>
              <h5 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
                UNDER FAVORABLE {item.title}
              </h5>

              {/* Price Block */}
              <div className="text-xl sm:text-2xl text-gray-800 font-semibold mb-4">
                <span className="block">FROM</span>
                <span className="block text-4xl sm:text-5xl font-bold mt-1">{item.price}</span>
              </div>

              <button className="bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 rounded-md text-base sm:text-lg font-semibold mt-3">
                Start Buying
              </button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-full max-w-[300px] max-h-[200px] sm:max-h-[280px] lg:max-h-[400px] object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </header>
</div>


        {/* Banners */}
        <div className='px-[4%] lg:px-[8%] py-12'>
          <div className='banner-1 flex flex-col justify-center gap-2 bg-cover bg-center rounded-xl p-3 md:p-6 h-[300px] sm:h-[380px]'
            style={{ backgroundImage: `url(${banner5})` }}>
            <small className='bg-yellow-500 text-white text-xl px-4 py-2 w-fit rounded-md rounded-tl-none'>EXCLUSIVE HEADPHONE</small>
            <h3 className='text-5xl font-semibold'>Release Date & Price</h3>
            <p className="text-xl">Today's Super Offer</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
            {/* Banner-1  */}
            <div
              className='flex flex-col gap-2 bg-cover bg-center rounded-xl p-3 md:p-6 h-[300px] sm:h-[380px]'
              style={{ backgroundImage: `url(${banner1})` }}>
              <small className='bg-yellow-500 text-white text-lg px-4 py-2 w-fit rounded-md rounded-tl-none'>NEW PRODUCT</small>
              <h3 className='text-xl md:text-xl font-semibold'>Release Date & Price</h3>
              <p className="text-base md:text-lg">Today's Super Offer</p>
            </div>
            {/* Banner-2  */}
            <div
              className='flex flex-col gap-2 bg-cover bg-center rounded-xl p-3 md:p-6 h-[300px] sm:h-[380px]'
              style={{ backgroundImage: `url(${banner2})` }}>
              <small className='bg-yellow-500 text-white text-lg px-4 py-2 w-fit rounded-md rounded-tl-none'>NEW PRODUCT</small>
              <h3 className='text-xl md:text-xl font-semibold'>Release Date & Price</h3>
              <p className="text-base md:text-lg">Today's Super Offer</p>
            </div>
            {/* Banner-3  */}
            <div
              className='flex flex-col gap-2 bg-cover bg-center rounded-xl p-3 md:p-6 h-[300px] sm:h-[380px]'
              style={{ backgroundImage: `url(${banner3})` }}>
              <small className='bg-yellow-500 text-white text-lg px-4 py-2 w-fit rounded-md rounded-tl-none'>NEW PRODUCT</small>
              <h3 className='text-xl md:text-xl font-semibold'>Release Date & Price</h3>
              <p className="text-base md:text-lg">Today's Super Offer</p>
            </div>
            {/* Banner-4  */}
            <div
              className='flex flex-col gap-2 bg-cover bg-center rounded-xl p-3 md:p-6 h-[300px] sm:h-[380px]'
              style={{ backgroundImage: `url(${banner4})` }}>
              <small className='bg-yellow-500 text-white text-lg px-4 py-2 w-fit rounded-md rounded-tl-none'>NEW PRODUCT</small>
              <h3 className='text-xl md:text-xl font-semibold'>Release Date & Price</h3>
              <p className="text-base md:text-lg">Today's Super Offer</p>
            </div>
          </div>
        </div>

        {/* Section Title  */}
        <div className='section-title px-[4%] lg:px-[8%] py-2'>
          <span className='text-xl font-semibold bg-yellow-300 px-3 py-1 rounded-full '>Our Products</span>
          <h1 className="text-3xl font-bold mt-3">Popular Products</h1>
        </div>

        {/* Products */}
        <div className="product-warpper px-[4%] lg:px-[8%] py-2 grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Products Cards */}
          <div className='lg:col-span-3'>
            <div className='grid products-warp gap-3'>
              <Shop hideLoadMore={true} hideHeader={true} />
            </div>
            <ToastContainer position='top-right' autoClose={1500} />
          </div>
        </div>

        {/* Special Deals */}
        <div className='px-[4%] lg:px-[8%] pb-10'>
          <h1 className="text-2xl font-bold mt-10 mb-5">Special Deals</h1>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={data.length > 4}
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            speed={1000}
            breakpoints={{
              1399: { slidesPerView: 3 },
              1199: { slidesPerView: 3 },
              991: { slidesPerView: 2 },
              767: { slidesPerView: 2 },
              575: { slidesPerView: 1 },
              0: { slidesPerView: 1 },
            }}
            className='p-15'
          >
            {data.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <div className='flex flex-col items-center text-center h-72 w-68 rounded-xl bg-gray-50 cursor-pointer' onClick={() => navigate(`/product/${item.id}`)}>
                  <img src={item.image} alt={item.title} className='w-full h-40 object-contain rounded-lg mb-2' />
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        {/* Brands */}
        <div className='px-[4%] lg:px-[8%] py-3'>
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

      </div>
    </>
  )
}

export default Index