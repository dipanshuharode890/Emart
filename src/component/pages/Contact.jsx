import React from 'react'
import { CiClock2 } from 'react-icons/ci'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { TbMailForward } from 'react-icons/tb'
import { Link } from 'react-router'

function Contact() {
    return (
        <>
            <div className="w-full bg-yellow-100 py-2 px-[4%] lg:px-[8%]">
                <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
                    <Link to='/' className="hover:underline text-gray-700 font-medium">Home</Link>
                    <span className="text-gray-500">&nbsp; / &nbsp;</span>
                    <span className="text-red-900 font-semibold">Contact</span>
                </div>
            </div>

            <div className="w-full bg-white text-gray-900 px-[4%] lg:px-[8%] pt-12 pb-10">
                <div className='max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 items-start gap-10'>
                    <div className="lg:col-span-2">
                        <h2 className='text-xl font-bold mb-2 text-gray-800 '>Leave us a Message</h2>
                        <div className='w-20 h-[3px] bg-yellow-400 mb-4'></div>
                        <p className='mb-5 text-base text-gray-600 leading-relaxed'>
                            Got a question or feedback? Feel out the form below and we'll get back to you as soon as possible.
                        </p>

                        <form className='space-y-6'>
                            <div className='grid grid-cols-1 gap-5'>
                                <input type="text" placeholder='Enter your Name' required className='border border-gray-300 rounded-lg px-5 py-2 my-3 w-full focus:outline-none focus:ring-2 focus-ring-yellow-400 shadow-sm transition' />
                            </div>
                            <input type="text" placeholder='Subject' required className='border border-gray-300 rounded-lg px-5 py-2 my-3 w-full focus:outline-none focus:ring-2 focus-ring-yellow-400 shadow-sm transition' />
                            <textarea rows={5} placeholder='Your Message' className='border border-gray-300 rounded-lg px-5 my-3 w-full focus:outline-none focus:ring-2 focus-ring-yellow-400 shadow-sm transition'></textarea>

                            <button type='submit' className='bg-yellow-400 hover:bg-yellow-500 text-white p px-4 py-2 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg'>Send Message</button>
                        </form>
                    </div>

                    <div className='bg-gray-50 rounded-xl px-4 shadow-md'>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Our Store</h3>
                        <div className='w-16 h-1 bg-yellow-400 mb-6'></div>
                        <p className='text-sm text-gray-700 mb-4 flex items-center'>
                            <FaMapMarkerAlt className='text-lg mr-2' />05, Malipura, <br />Dewas, 455001, Madhya Pradesh, India
                        </p>
                        <h4 className='font-semibold text-base mb-2 text-gray-800'>Hours of Operation</h4>
                        <ul className='text-sm text-gray-600 mb-4 space-y-1'>
                            <li className='flex'><CiClock2 className='text-yellow-500 mr-2' />Monday - Friday : 10-5 PM</li>
                            <li className='flex'><CiClock2 className='text-yellow-500 mr-2' />Saturday : 12-3 PM</li>
                            <li className='flex'><CiClock2 className='text-yellow-500 mr-2' />Sunday : Closed</li>
                        </ul>

                        <h4 className='font-semibold text-base mb-2 text-gray-800'>Careers</h4>
                        <p className="text-sm text-gray-600">
                            Interested in joining our team? Reach out at : <br />
                            <div className='flex'>
                                <TbMailForward className='text-yellow-500 mr-2' />
                                <a href="#" className='text-yellow-500 hover:underline'>contact@emart.com</a>
                            </div>
                        </p>
                    </div>
                </div>
            </div>

            <div className='w-full px-[4%] lg:px-[8%] pb-16'>
                <div className="text-center mb-7">
                    <h3 className='text-xl font-bold text-gray-800'>Our Location</h3>
                    <div className="w-20 h-[3px] bg-yellow-300 mx-auto mt-2"></div>
                    <div className='rounded-xl overflow-hidden shadow-lg h-[500px] w-full border-gray-200'>
                        <iframe
                            title='Dewas Google Map'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58779.40320499187!2d76.00134636652217!3d22.960805562008606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396317850c371de7%3A0x22947c209f24505!2sDewas%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1752928940886!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            className='border-0'>
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact