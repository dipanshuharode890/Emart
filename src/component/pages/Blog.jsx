import React from 'react'
import blogImg1 from '../../assets/blog-1.jpg';
import blogImg2 from '../../assets/blog-2.jpg';
import blogImg3 from '../../assets/blog-3.jpg';
import blogImg4 from '../../assets/blog-4.jpg';
import blogImg5 from '../../assets/blog-5.jpg';

import { SlCalender } from 'react-icons/sl';
import { FaArrowRight, FaHashtag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoInformationCircleOutline, IoSearch } from 'react-icons/io5';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { CiClock2 } from 'react-icons/ci';

const blogPost = [
    {
        id: 1,
        image: blogImg1,
        title: "Robot Wars - Post With Gallery",
        meta: "Design, Tech - July 2025",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut magnam,aperiam laborum delectus doloribus at incidunt."
    },
    {
        id: 2,
        image: blogImg2,
        title: "Robot Wars - Post With Gallery",
        meta: "Design, Tech - July 2025",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut magnam, aperiam laborum delectus doloribus at incidunt."
    },
    {
        id: 3,
        image: blogImg3,
        title: "Robot Wars - Post With Gallery",
        meta: "Design, Tech - July 2025",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autmagnam, aperiam laborum delectus doloribus at incidunt."
    },
    {
        id: 4,
        image: blogImg4,
        title: "Robot Wars - Post With Gallery",
        meta: "Design, Tech - July 2025",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autmagnam, aperiam laborum delectus doloribus at incidunt."
    },
    {
        id: 5,
        image: blogImg5,
        title: "Robot Wars - Post With Gallery",
        meta: "Design, Tech - July 2025",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autmagnam, aperiam laborum delectus doloribus at incidunt."
    },
];

function Blog() {

    return (
        <>
            <div className="w-full bg-yellow-100 py-2 px-[4%] lg:px-[8%]">
                <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
                    <Link to='/' className="hover:underline text-gray-700 font-medium">Home</Link>
                    <span className="text-gray-500">&nbsp; / &nbsp;</span>
                    <span className="text-red-900 font-semibold">Blog</span>
                </div>
            </div>

            {/* Blog Section */}
            <div className="w-full bg-gray-50 py-12 px-[4%] lg:px-[8%] text-gray-900">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Blog List */}
                    <div className="lg:col-span-8 space-y-5">
                        {blogPost.map((post) => (
                            <div key={post.id} className='relative group flex flex-col gap-6 items-start border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition duration-300'>
                                <div className="overflow-hidden rounded-lg shadow-md w-full">
                                    <img src={post.image} alt={post.title}
                                        className='w-full transition-transform object-cover duration-300 group-hover:scale-105' />
                                </div>
                                <div className='flex-1'>
                                    <h2 className='text-xl font-bold text-gray-600 mb-1 group-hover:text-yellow-600 transition'>{post.title}</h2>
                                    <p className='text-sm text-gray-500 flex items-center gap-2 mb-1'><SlCalender /> {post.meta}</p>
                                </div>

                                <div className="w-16 h-[2px] bg-yellow-400 mb-1 group-hover:w-32 transition-all duration-300"></div>

                                <p className='text-base text-gray-700 leading-relaxed mb-2'>{post.excerpt}</p>
                                <button className='inline-flex items-center gap-2 px-5 py-2 text-sm text-black font-bold bg-yellow-400 border border-yellow-400 rounded-full transition-all duration-300 hover:bg-transparent hover:text-black hover:border-yellow-400'>Read More <FaArrowRight /></button>
                            </div>
                        ))}
                    </div>

                    {/* SlideBar */}
                    <aside className='lg:col-span-4 space-y-8'>
                        {/* Search */}
                        <div className="border rounded-lg p-1 bg-yellow-500 shadow-sm">
                            <div className="flex items-center overflow-hidden border rounded bg-white">
                                <input type="text" placeholder='Search...' className='w-full px-3 py-2 text-sm outline-none' />
                                <IoSearch className='text-yellow-500 mr-5' />
                            </div>
                        </div>
                        {/* About */}
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                            <h4 className='text-lg font-semibold mb-2 flex items-center gap-2'>
                                <IoInformationCircleOutline className='text-yellow-500' /> About blog </h4>
                            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, totam.</p>
                        </div>
                        {/* Categories */}
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                            <h4 className='text-lg font-semibold mb-2 flex items-center gap-2'>
                                <BsBookmarkCheckFill className='text-yellow-500' /> Categorise </h4>
                            <ul className='text-sm text-gray-600 space-y-1'>
                                <li className='hover:text-yellow-500 cursor-pointer'>⬤  Design</li>
                                <li className='hover:text-yellow-500 cursor-pointer'>⬤  Technology</li>
                                <li className='hover:text-yellow-500 cursor-pointer'>⬤  Audio</li>
                                <li className='hover:text-yellow-500 cursor-pointer'>⬤  Lifestyle</li>
                            </ul>
                        </div>
                        {/* Recent Posts */}
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                            <h4 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'>
                                <CiClock2 className='text-green-500 text-xl' />Recent Posts
                            </h4>
                            <ul className='space-y-4'>
                                {blogPost.map((post) => (
                                    <li key={post.id} className='flex items-start gap-4 group hover:bg-gray-50 p-2 rounded-md transition-all duration-300 '>
                                        <img src={post.image} alt={post.title} className='w-16 h-16 object-cover rounded-md shadow-sm shrink-0' />
                                        <div className="flex flex-col">
                                            <span className='text-sm font-medium text-gray-800 group-hover:text-yellow-500 transition'>{post.title}</span>
                                            <p className='text-xs text-gray-500 mt-1 flex items-center gap-1'>
                                                <SlCalender className='text-gray-400 text-sm' />  {post.meta} </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Tags */}
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                            <h4 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'>
                                <FaHashtag className='text-pink-500 text-xl' /> Tags
                            </h4>
                            <div className='flex flex-wrap gap-2 text-sm'>
                                {["Tech", "Modern", "Videos", "Bootstrap", "Theme", "Creative"].map((tag) => (
                                    <span key={tag} className='bg-gray-200 px-2 py-1 rounded hover:bg-yellow-300 cursor-pointer transition'>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </>
    )
}

export default Blog