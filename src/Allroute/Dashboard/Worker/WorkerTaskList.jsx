import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TaskCard from '../../../AllComponent/TaskCard';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';

const WorkerTaskList = () => {
    const axiosSecure = useAxiosSecure();
    const { data: alltask, isLoading, refetch } = useQuery({
        queryKey: ['workerAllTask'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/Alltask`);
            return res.data;
        },
    });
   

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Available Tasks</h2>
                {isLoading && <p className="text-gray-500">Loading tasks...</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {alltask?.map((data, index) => (
                    <TaskCard key={index} data={data} />
                ))}
            </div>
        </div>
    );
};

export default WorkerTaskList;
