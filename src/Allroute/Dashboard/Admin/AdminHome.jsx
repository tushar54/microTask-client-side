import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import Swal from 'sweetalert2'

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all pending withdrawal requests
    const { data: withdrawalRequests, isLoading: isWithdrawLoading, refetch } = useQuery({
        queryKey: ['withdrawRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/withdrawRequests?status=pending');
            return res.data; // Ensure your API returns pending requests
        },
    });
    console.log(withdrawalRequests)
    // Fetch all information stats
    const { data: allinfo, isLoading: isInfoLoading, error, refetch: refetchInfo } = useQuery({
        queryKey: ['allinfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allinformation`);
            return res.data;
        },
    });

    // Mutation to handle payment success
    const paymentSuccessMutation = useMutation({
        mutationFn: async ({ requestId, withdrawalAmount, workerEmail }) => {
            await axiosSecure.patch(`/withdrawRequests${requestId}`, {
                withdrawalAmount,
                workerEmail,
            });

        },
        onSuccess: () => {
            refetch();
            refetchInfo();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
        },
    });

    const handlePaymentSuccess = (requestId, withdrawalAmount, workerEmail) => {
        paymentSuccessMutation.mutate({ requestId, withdrawalAmount, workerEmail });
    };

    return (
        <div>
            {/* Stats Section */}
            <div className="mb-6">
                {isInfoLoading ? (
                    <p>Loading stats...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-4 justify-between items-center gap-4">
                        <div className="card">
                            <h3 className="text-lg font-bold">Total Worker</h3>
                            <p>{allinfo?.result}</p>
                        </div>
                        <div className="card">
                            <h3 className="text-lg font-bold">Total Buyer</h3>
                            <p>{allinfo?.result1}</p>
                        </div>
                        <div className="card">
                            <h3 className="text-lg font-bold">Total Available Coin</h3>
                            <p>coin: {allinfo?.totalCoins}</p>
                        </div>
                        <div className="card">
                            <h3 className="text-lg font-bold">Total Payments</h3>
                            <p>{allinfo?.result2}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Withdrawal Requests Table */}
            <div>
                <h3 className="text-xl font-bold mb-4">Pending Withdrawal Requests</h3>
                {isWithdrawLoading ? (
                    <p>Loading withdrawal requests...</p>
                ) : (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Worker Name</th>
                                <th className="border border-gray-300 p-2">Worker Email</th>
                                <th className="border border-gray-300 p-2">Payment System</th>
                                <th className="border border-gray-300 p-2">Account Number</th>
                                <th className="border border-gray-300 p-2">Withdrawal Amount</th>
                                <th className="border border-gray-300 p-2">Withdrawal Coin</th>
                                <th className="border border-gray-300 p-2">Withdraw Date</th>
                                <th className="border border-gray-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawalRequests?.map((request) => (
                                <tr key={request._id}>
                                    <td className="border border-gray-300 p-2">{request.worker_name}</td>
                                    <td className="border border-gray-300 p-2">{request.worker_email}</td>
                                    <td className="border border-gray-300 p-2">{request.payment_system}</td>
                                    <td className="border border-gray-300 p-2">{request.account_number}</td>
                                    <td className="border border-gray-300 p-2">{request.withdrawal_amount}</td>
                                    <td className="border border-gray-300 p-2">{request.withdrawal_coin}</td>
                                    <td className="border border-gray-300 p-2">{new Date(request.withdraw_date).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() =>
                                                handlePaymentSuccess(
                                                    request._id,
                                                    request.withdrawal_coin,
                                                    request.worker_email
                                                )
                                            }
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            disabled={paymentSuccessMutation.isLoading}
                                        >
                                            {paymentSuccessMutation.isLoading ? 'Processing...' : 'Payment Success'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminHome;
