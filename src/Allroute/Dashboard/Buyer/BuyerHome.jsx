import React, { useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FcApprove, FcViewDetails } from 'react-icons/fc';
import { CiCircleRemove } from "react-icons/ci";
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';

const BuyerHome = () => {
    const { currentUser } = useAuth();
    const [modalData, setModalData] = useState(null);
    const axiosSecure = useAxiosSecure();

    // Fetch buyer stats
    const { data: buyerStats, isLoading: statsLoading,refetch:refetchforstats } = useQuery({
        queryKey: ['buyerStats', currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyerStats?email=${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });
    console.log(buyerStats)

    // Fetch tasks
    const { data: userdata, isLoading, refetch } = useQuery({
        queryKey: ['buyerpendingtask', currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/alltaskForbuyer?email=${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    const handleOpenModal = (submission) => {
        setModalData(submission);
    };

    const handleApprove = async (submissionId, workerEmail, payableAmount) => {
        try {
            await axiosSecure.patch(`/approveSubmission`, {
                submissionId,
                workerEmail,
                payableAmount,
            });
            refetch();
            refetchforstats()
        } catch (error) {
            console.error('Error approving submission:', error);
        }
    };

    const handleReject = async (submissionId, taskId) => {
        try {
            await axiosSecure.patch(`/rejectSubmission`, {
                submissionId,
                taskId,
            });
            refetch();
            refetchforstats()
        } catch (error) {
            console.error('Error rejecting submission:', error);
        }
    };

    return (
        <div>
            <div className="mb-6">
                {statsLoading ? (
                    <p>Loading stats...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="card">
                            <h3 className="text-lg font-bold">Total Tasks</h3>
                            <p>{buyerStats?.totalTaskCount}</p>
                        </div>
                        <div className="card">
                            <h3 className="text-lg font-bold">Pending Workers</h3>
                            <p>{buyerStats?.pendingTask}</p>
                        </div>
                        <div className="card">
                            <h3 className="text-lg font-bold">Total Payment Paid</h3>
                            <p>coin: {buyerStats?.totalPaymentPaid}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Worker Name</th>
                            <th>Title</th>
                            <th>Payable Amount</th>
                            <th>Submission Details</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userdata?.map(data => (
                            <tr key={data._id}>
                                <td>{data.worker_name}</td>
                                <td>{data.task_title}</td>
                                <td>{data.payable_amount}</td>
                                <td>
                                    <button onClick={() => handleOpenModal(data)}>
                                        <FcViewDetails />
                                    </button>
                                </td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleApprove(data._id, data.worker_email, data.payable_amount)}>
                                        <FcApprove />
                                    </button>
                                    <button onClick={() => handleReject(data._id, data.task_id)}>
                                        <CiCircleRemove />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalData && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-lg font-bold">Submission Details</h2>
                        <p>{modalData.submission_details}</p>
                        <button className="btn" onClick={() => setModalData(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerHome;
