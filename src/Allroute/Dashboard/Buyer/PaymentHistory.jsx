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
            const res = await axiosSecure.get(`/paymenthistory${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    return (
        <div className="overflow-x-auto px-4 py-6">
            <table className="min-w-full table-auto  border border-gray-300 rounded-lg shadow-md">
                {/* Table Head */}
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Transaction ID</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Purchased Coins</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total Cost</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {
                        history?.map((data) => (
                            <tr key={data.paymentIntentId} className="border-t border-gray-200 hover:bg-gray-50 transition duration-200">
                                <td className="py-3 px-4 text-sm text-gray-800">{data.paymentIntentId}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{data.coins}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{data.cost}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
