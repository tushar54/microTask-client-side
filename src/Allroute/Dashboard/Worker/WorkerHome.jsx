import React, { useEffect, useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const WorkerHome = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();

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
  console.log(data)

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        {statsLoading ? (
          <div className="text-center text-gray-500">Loading stats...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="card p-6  shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-bold text-gray-800">Total Tasks</h3>
              <p className="text-xl font-semibold text-indigo-600">{workerStats?.totalTaskCount}</p>
            </div>
            <div className="card p-6  shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-bold text-gray-800">Pending Work</h3>
              <p className="text-xl font-semibold text-yellow-600">{workerStats?.pendingTask}</p>
            </div>
            <div className="card p-6  shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-bold text-gray-800">Total Payment Paid</h3>
              <p className="text-xl font-semibold text-green-600">coin: {workerStats?.totalPaymentPaid}</p>
            </div>
          </div>
        )}
      </div>
      <div className="overflow-x-auto  shadow-lg rounded-lg">
        <table className="table-auto w-full text-left border-collapse">
          {/* head */}
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4">Jobcode</th>
              <th className="py-2 px-4">Coin</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>

            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="py-2 px-4">{item.task_id}</td>
                  <td className="py-2 px-4">{item.payable_amount}</td>
                  <td
                    className={`py-2 px-4 ${item.status === "approved"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                      }`}
                  >
                    {item.status}
                  </td>
                  <td className="py-2 px-4">{item.current_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Here is no data
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;
