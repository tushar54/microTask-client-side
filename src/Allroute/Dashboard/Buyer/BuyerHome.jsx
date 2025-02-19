import React, { useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FcApprove, FcViewDetails } from 'react-icons/fc';
import { CiCircleRemove } from "react-icons/ci";
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import Swal from 'sweetalert2';

// Card Component for Stats
const StatsCard = ({ title, value }) => (
  <div className="card p-4 border border-gray-200 rounded-md shadow-sm">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-xl">{value}</p>
  </div>
);

const BuyerHome = () => {
  const { currentUser } = useAuth();
  const [modalData, setModalData] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch buyer stats
  const { data: buyerStats, isLoading: statsLoading, refetch: refetchForStats } = useQuery({
    queryKey: ['buyerStats', currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyerStats?email=${currentUser?.email}`);
      return res.data;
    },
    enabled: !!currentUser?.email,
  });

  // Fetch tasks
  const { data: userdata, isLoading: tasksLoading, refetch } = useQuery({
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
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosSecure.patch(`/approveSubmission`, { submissionId, workerEmail, payableAmount });
          Swal.fire({
            title: "Approved!",
            text: "Submission has been approved.",
            icon: "success"
          });
        }
      });
      refetch();
      refetchForStats();
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  const handleReject = async (submissionId, taskId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosSecure.patch(`/rejectSubmission`, { submissionId, taskId });
          refetch();
          refetchForStats();
          Swal.fire({
            title: "Rejected!",
            text: "Submission has been rejected.",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  return (
    <div>
      {/* Stats Section */}
      <div className="mb-6">
        {statsLoading ? (
          <p>Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-black">
            <StatsCard title="Total Tasks" value={buyerStats?.totalTaskCount} />
            <StatsCard title="Pending Workers" value={buyerStats?.pendingTask} />
            <StatsCard title="Total Payment Paid" value={`coin: ${buyerStats?.totalPaymentPaid}`} />
          </div>
        )}
      </div>

      {/* Pending Submissions Section */}
      <div>
        <h1 className='text-center font-bold text-xl mb-4'>Pending Submissions</h1>
      </div>

      {tasksLoading ? (
        <p className="text-center">Loading pending tasks...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
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
                    <button onClick={() => handleOpenModal(data)} className="text-blue-500 text-2xl">
                      <FcViewDetails />
                    </button>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleApprove(data._id, data.worker_email, data.payable_amount)}
                      className="text-green-500 text-2xl"
                    >
                      <FcApprove />
                    </button>
                    <button
                      onClick={() => handleReject(data._id, data.task_id)}
                      className="text-red-500 text-2xl"
                    >
                      <CiCircleRemove />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Submission Details */}
      {modalData && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg font-bold">Submission Details</h2>
            <p>{modalData.submission_details}</p>
            <button className="btn mt-4" onClick={() => setModalData(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
