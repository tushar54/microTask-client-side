import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';

const AdminHome = () => {
    const axiosSecure=useAxiosSecure()
    const { data: allinfo, isLoading, error, refetch } = useQuery({
        queryKey: ['allinfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allinformation`);
            return res.data;
        },
    });
    return (
        <div>
            
        </div>
    );
};

export default AdminHome;