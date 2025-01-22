import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TaskCard from '../../../AllComponent/TaskCard';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';

const WorkerTaskList = () => {
    const axiosSecure=useAxiosSecure()
    const { data: alltask, isLoading, refetch } = useQuery({
        queryKey: ['userAllTask'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/Alltask`);
            return res.data;
        },

    });
    // console.log(alltask)

    return (
        <div className='grid grid-cols-3 gap-4'>
            {
                alltask?.map(data=> <TaskCard data={data}></TaskCard>)
            }
        </div>
    );
};

export default WorkerTaskList;