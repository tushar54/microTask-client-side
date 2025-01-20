import React, { useEffect, useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import axios from 'axios';

const WorkerHome = () => {
  const { currentUser } = useAuth()
  const [data, setData] = useState()
  useEffect(() => {
    if (!currentUser) return; // Prevent running if currentUser is not available

    const fetchSubmissions = async () => {
      try {
        const allsubmission = await axios.get(`http://localhost:5000/approvedSubmission?email=${currentUser.email}`);
        setData(allsubmission.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions(); // Call the function to fetch data
  }, [currentUser]);

  return (
    <div>
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