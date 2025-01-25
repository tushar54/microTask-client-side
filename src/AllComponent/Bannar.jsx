// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../public/BannarIMg/undraw_career-development_f0n6.png'
import img2 from '../../public/BannarIMg/undraw_shared-workspace_1u82.png'
import img3 from '../../public/BannarIMg/undraw_specs_2nnl.png'
import img4 from '../../public/BannarIMg/undraw_team-collaboration_phnf.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Bannar() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-[450px] overflow-hidden container mx-auto "
            >
                <SwiperSlide
                    className="bg-cover bg-center w-full h-full relative"
                    style={{ backgroundImage: `url(${img1})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Text Content */}
                    <div className="font-bold flex justify-center items-center w-full h-full text-center text-white text-3xl relative">
                    Find the Best Micro Jobs <br /> in Our Marketplace.
                    </div>
                </SwiperSlide>

                <SwiperSlide
                    className="bg-cover bg-center w-full h-full relative"
                    style={{ backgroundImage: `url(${img2})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Text Content */}
                    <div className="font-bold flex justify-center items-center w-full h-full text-center text-white text-3xl relative">
                        You can Work any Time
                    </div>
                </SwiperSlide>

                <SwiperSlide
                    className="bg-cover bg-center w-full h-full relative"
                    style={{ backgroundImage: `url(${img3})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Text Content */}
                    <div className="font-bold flex justify-center items-center w-full h-full text-center text-white text-3xl relative">
                        You Will be Benefited <br /> From Our Website
                    </div>
                </SwiperSlide>
                <SwiperSlide
                    className="bg-cover bg-center w-full h-full relative"
                    style={{ backgroundImage: `url(${img4})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Text Content */}
                    <div className="font-bold flex justify-center items-center w-full h-full text-center text-white text-3xl relative">
                       Give Your Passion And <br /> Work With our Website.
                    </div>
                </SwiperSlide>






            </Swiper>

            <div></div>
        </>
    );
}
