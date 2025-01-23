import React from 'react';
import useAuth from '../../../AllHooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';

const PaymentHistory = () => {
    const { currentUser } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: history, isLoading, refetch } = useQuery({
        queryKey: ['paymenthistory', currentUser?.email],
        queryFn: async () => {
            console.log(currentUser.email)
            const res = await axiosSecure.get(`/paymenthistory${currentUser?.email}`);
            console.log()
            return res.data;
        },
        enabled: !!currentUser?.email,
    });
    console.log(history)

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Transection Id</th>
                        <th>Purchased Coin</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history?.map(data => 
                        <tr className="">
                            <td>{data.paymentIntentId}</td>
                            <td>{data.coins}</td>
                            <td>{data.cost}</td>
                           
                            
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;