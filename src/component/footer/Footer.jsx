import React from 'react'
import { BsCashCoin, BsFillShieldLockFill } from 'react-icons/bs'
import { FaFacebook, FaHeadset, FaInstagram, FaTwitter } from 'react-icons/fa'
import { ImTruck } from 'react-icons/im'

function Footer() {
  return (
    <>
      <footer className='px-[4%] lg:px-[8%] pt-5'>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-4 gap-4 py-8">
          <div className="flex items-center gap-3">
            <ImTruck className='text-4xl text-yellow-500' />
            <p className='text-sm'>
              <strong>FREE DELIVERY</strong> <br />
              Free Shipping on all Orders Above 1000
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BsCashCoin className='text-4xl text-yellow-500' />
            <p className='text-sm'>
              <strong>Returns</strong> <br />
              Back guarantee under 7 days
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FaHeadset className='text-4xl text-yellow-500' />
            <p className='text-sm'>
              <strong>Support 24/7</strong> <br />
              Support Online 24 hours a day
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BsFillShieldLockFill className='text-4xl text-yellow-500' />
            <p className='text-sm'>
              <strong>Payments</strong> <br />
              100% payment security
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg-grid-cols-4 gap-6 px-4 py-8 border-t border-yellow-500">
          <div className="space-y-2">
            <a href="#">
              <h2 className="text-3xl text-black font-bold">E<span className='text-yellow-500'>-Mart</span></h2>
            </a>
            <p className='text-xm'>Find the location nearest you.</p>
            <p className='text-xm'>See <a href="#" className='text-red-600 underline'>Our Stores</a></p>
            <p className=''>support@emart.com</p>
            <div className='flex gap-5 text-gray-600 text-sm mt-3'>
              <FaInstagram className='hover:text-white hover:bg-red-500 cursor-pointer transition w-8 h-8 rounded-full flex items-center justify-center' />
              <FaFacebook className='hover:text-white hover:bg-red-500 cursor-pointer transition w-8 h-8 rounded-full flex items-center justify-center' />
              <FaTwitter className='hover:text-white hover:bg-red-500 cursor-pointer transition w-8 h-8 rounded-full flex items-center justify-center' />
            </div>
          </div>
          <div className='space-y-1'>
              <h3 className='font-semibold text-xl mb-2'>About Us</h3>
              {['About Us', 'News & Blog', 'Brands', 'Press Center', 'Advertising', 'Investers'].map((link, i) => (
                <p key={i} className=''><a href="#" className='text-lg hover:text-red-500 '>{link}</a></p>
              ))}
          </div>

          <div className="space-y-1">
              <h3 className="font-semibold text-xl mb-2">Support</h3>
              {['Support Center', 'Manage', 'Service', 'Contact'].
              map((link,i) => (
                <p key={i} className=''><a href="#" className='text-lg hover:text-red-500 '>{link}</a></p>
              ))}
          </div>

          <div className="space-y-1">
              <h3 className="font-semibold text-xl mb-2">Order</h3>
              {['Check Order', 'Delivery & Pickup', 'Returns', 'Exchanges', 'Developers', 'Gift', 'Cards'].
              map((link,i) => (
                <p key={i} className=''><a href="#" className='text-lg hover:text-red-500 '>{link}</a></p>
              ))}
          </div>
          
        </div>

        <p className='text-center text-lg text-gray-600 border-t border-yellow-500 py-5'>© 2025. All Rights Reserved. By 
          <a href="#" className='text-black font-bold'> E<span className='text-yellow-500'>-Mart</span>
          </a>
        </p>
        
      </footer>
    </>
  )
}

export default Footer