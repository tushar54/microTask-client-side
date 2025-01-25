import React, { useEffect, useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';

const WorkerSubmission = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!currentUser) return; // Prevent running if currentUser is not available

    const fetchSubmissions = async () => {
      try {
        const allsubmission = await axiosSecure.get(`/submission?email=${currentUser.email}`);
        setData(allsubmission.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions(); // Call the function to fetch data
  }, [currentUser]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Submission List</h2>
      </div>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table-auto w-full text-left border-collapse">
          {/* head */}
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4">Jobcode</th>
              <th className="py-3 px-4">Coin</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((submission, index) => (
              <tr key={index} className="text-center border-b">
                <td className="py-3 px-4">{submission.task_id}</td>
                <td className="py-3 px-4">{submission.payable_amount}</td>
                <td
                  className={`py-3 px-4 ${
                    submission.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : submission.status === 'approved'
                      ? 'bg-green-400 text-white'
                      : 'bg-red-400 text-white'
                  }`}
                >
                  {submission.status}
                </td>
                <td className="py-3 px-4">{submission.current_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerSubmission;
