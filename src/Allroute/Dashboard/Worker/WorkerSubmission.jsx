import React, { useEffect, useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';

const WorkerSubmission = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Set number of items per page
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

  // Calculate index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);


 
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  console.log({indexOfFirstItem,indexOfLastItem,currentItems,currentPage,totalPages})

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Submission List</h2>
      </div>
      <div className="overflow-x-auto  shadow-lg rounded-lg">
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
            {currentItems?.map((submission, index) => (
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-2 ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkerSubmission;
