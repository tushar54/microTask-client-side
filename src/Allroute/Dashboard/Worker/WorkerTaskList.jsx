import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import TaskCard from '../../../AllComponent/TaskCard';

const WorkerTaskList = () => {
    const { data: alltask, isLoading, refetch } = useQuery({
        queryKey: ['userAllTask'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/Alltask`);
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