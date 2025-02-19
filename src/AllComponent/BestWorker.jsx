import React, { useEffect } from 'react';
import useAxiosSecure from '../AllHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AOS from "aos";
import "aos/dist/aos.css"; 

const BestWorker = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          offset: 50,     // Offset (in px) from the original trigger point
          easing: "ease-in-out", // Animation easing function
          once: false,     // Whether animation should happen only once
        });
      }, []);

    const axiosSecure = useAxiosSecure()
    const { data: bestworker, isLoading, error, refetch } = useQuery({
        queryKey: ['bestworker'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bestWorker');
            return res.data;
        },


    });

    return (
        <div className='mb-5'>
            <div className='container mx-auto text-center'><h1 className='text-3xl font-bold ml-8 m-10'>Best Workers</h1></div>
            <div className='grid md:grid-cols-3 container mx-auto justify-center items-center gap-5'>
                {
                    bestworker?.map(worker =>
                        <div data-aos="fade-left"
                            key={worker._id}
                            className="flex flex-col items-center  shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                                <img referrerPolicy='no-referrer'
                                    src={worker.imgurl}
                                    alt={worker.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="mt-4 text-xl font-semibold ">{worker.name}</h2>
                            <p className=" mt-2">
                                Available Coins: <span className="text-green-500 font-bold">{worker.coin}</span>
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default BestWorker;