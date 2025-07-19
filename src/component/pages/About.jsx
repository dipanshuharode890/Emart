import React from 'react'
import aboutImg1 from '../../assets/about--card-1.jpg';
import aboutImg2 from '../../assets/about--card-1.jpg';
import aboutImg3 from '../../assets/about--card-1.jpg';
import bgImage from '../../assets/blog-1.jpg';
import aboutImg from '../../assets/blog-4.jpg';

import member1 from '../../assets/team-1.jpg';
import member2 from '../../assets/team-2.jpg';
import member3 from '../../assets/team-3.jpg';
import member4 from '../../assets/team-4.jpg';
import member5 from '../../assets/team-5.jpg';
import { Link } from 'react-router';
import { createShadow } from 'swiper/effect-utils';

function About() {
    return (
        <>
            <div className="w-full bg-yellow-100 py-2 px-[4%] lg:px-[8%]">
                <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
                    <Link to='/' className="hover:underline text-gray-700 font-medium">Home</Link>
                    <span className="text-gray-500">&nbsp; / &nbsp;</span>
                    <span className="text-red-900 font-semibold">About Us</span>
                </div>
            </div>

            <div className="relative flex items-center justify-center h-[50vh] sm:h-[60vh] bg-cover bg-center" style={{backgroundImage: `url(${bgImage})`}}>
                <div className='absolute inset-0 bg-black/80 backdrop-filter backdrop-blur-sm'></div>
                <div className='relative z-10 text-center text-white px-[4%] lg:px-[8%]'>
                    <p className='uppercase tracking-widest text-xs sm:text-sm text-gray-300 mb-2'>Who We Are</p>
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-3'>About Us</h2>
                    <div className='w-30 h-[2px] bg-yellow-500 mx-auto mb-3'></div>
                    <p className='max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam deleniti temporibus quam omnis minima nihil eligendi.</p>
                </div>
            </div>

            <div className="section-title bg-yellow-100 my-8 px-[4%] lg:px-[8%]">
                <span className='text-xl font-semibold text-yellow-300 px-5 py-2 rounded-full'>Vision</span>
                <h1 className='text-2xl font-bold mt-3'>Our Vision</h1>
            </div>

            <div className='px-[4%] lg:px-[8%] mt-16 mb-24'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            img: aboutImg1,
                            title: 'What we really do?',
                            text : "We create meaningful degital experiences that empower   people, brands, and business to grow with confidence"
                        },
                        {
                            img: aboutImg2,
                            title: 'Our Vision',
                            text : "We create meaningful degital experiences that empower   people, brands, and business to grow with confidence"
                        },
                        {
                            img: aboutImg3,
                            title: 'History of beginning',
                            text : "We create meaningful degital experiences that empower   people, brands, and business to grow with confidence"
                        }
                    ].map((card, index) => (
                        <div key={index} className='group relative bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-3 text-left hover:bg-white'>
                            <div className='overflow-hidden rounded-xl'>
                                <img src={card.img} alt={card.title} 
                                className='w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300'/>
                            </div>
                            <h3 className='mt-6 text-lg font-semibold text-yellow-500 '>
                                {card.title}
                            </h3>
                            <p className='mt-2 test-sm text-gray-600 leading-relaxed'>
                                {card.text}
                            </p>
                            <div className='mt-4 w-0 group-hover:w-full h-[2px] bg-yellow-500 transition-all duration-300'></div>
                        </div>
                    ))
                    }
                </div>
            </div>

            <div className="bg-gray-50 py-24 px-[4%] lg:px-[8%]">
                <div className="flex flex-warp justify-center gap-10 items-start text-center">
                    {[
                        {
                            img: member1, name:'thomas snow', role:"CEO/Founder"
                        },
                        {
                            img: member2, name:'thomas snow', role:"Client Care"
                        },
                        {
                            img: member3, name:'thomas snow', role:"Support Boss "
                        },
                        {
                            img: member4, name:'thomas snow', role:"Delivery Driver"
                        },
                        {
                            img: member5, name:'thomas snow', role:"Packing Girl"
                        },
                        ].map((member, idx) => (
                            <div key={idx} className='flex flex-col items-center'>
                                <div className="w-60 h-60 rounded-full border border-gray-300 shadow-md overflow-hidden">
                                    <img src={member.img} alt={member.name} className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'/>
                                </div>
                                <h4 className='mt-4 text-lg font-semibold text-yellow-500 '>{member.name}</h4>
                                <p className='text-sm text-gray-500'>{member.role}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default About