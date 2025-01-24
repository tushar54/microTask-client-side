import React, { useEffect, useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const WorkerHome = () => {
  const { currentUser } = useAuth()
  const [data, setData] = useState()
  const axiosSecure = useAxiosSecure()

  const { data: workerStats, isLoading: statsLoading, refetch: refetchforstats } = useQuery({
    queryKey: ['workerStats', currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/workerStats?email=${currentUser?.email}`);
      return res.data;
    },
    enabled: !!currentUser?.email,
  });
  useEffect(() => {
    if (!currentUser) return; // Prevent running if currentUser is not available

    const fetchSubmissions = async () => {
      try {
        const allsubmission = await axiosSecure.get(`/approvedSubmission?email=${currentUser.email}`);
        setData(allsubmission.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions(); // Call the function to fetch data
  }, [currentUser]);

  return (
    <div>
      <div className="mb-6">
        {statsLoading ? (
          <p>Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card">
              <h3 className="text-lg font-bold">Total Tasks</h3>
              <p>{workerStats?.totalTaskCount}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-bold">Pending Workers</h3>
              <p>{workerStats?.pendingTask}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-bold">Total Payment Paid</h3>
              <p>coin: {workerStats?.totalPaymentPaid}</p>
            </div>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className='text-center'>
              <th>Jobcode</th>
              <th>Coin</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map(data => <tr className='text-center'>
                <th>{data.task_id}</th>
                <th>{data.payable_amount}</th>
                <th className='bg-green-500'>{data.status}</th>
                <th>{data.current_date}</th>

              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;