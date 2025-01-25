import React from 'react';
import useAxiosSecure from '../AllHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const BestWorker = () => {

    const axiosSecure = useAxiosSecure()
    const { data: bestworker, isLoading, error, refetch } = useQuery({
        queryKey: ['bestworker'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bestWorker');
            return res.data;
        },


    });
    console.log(bestworker)
    return (
        <div>
            <div><h1 className='text-3xl font-bold ml-8 m-10'>Best Workers</h1></div>
            <div className='grid md:grid-cols-3 container mx-auto justify-center items-center gap-5'>
                {
                    bestworker?.map(worker =>
                        <div
                            key={worker._id}
                            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                                <img
                                    src={worker.imgurl}
                                    alt={worker.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-800">{worker.name}</h2>
                            <p className="text-gray-600 mt-2">
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