import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrash } from 'react-icons/fa6';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageTask = () => {
    const axiosSecure = useAxiosSecure();

    const { data: alltask, refetch } = useQuery({
        queryKey: ['AllTaskforAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allTaskForAdmin');
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/DeleteTaskbyadmin/${id}`);
                refetch();
                Swal.fire('Deleted!', 'The task has been removed.', 'success');
            }
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Manage Tasks</h1>
            <div className="overflow-x-auto md:overflow-auto">
                {/* Table for larger screens */}
                <table className="hidden md:table w-full border border-gray-200 shadow-lg">
                    <thead className="bg-gray-200 text-gray-700 text-sm">
                        <tr>
                            <th className="p-4 text-left">Task ID</th>
                            <th className="p-4 text-left">User Name</th>
                            <th className="p-4 text-left">Required Workers</th>
                            <th className="p-4 text-left">Payable Amount</th>
                            <th className="p-4 text-left">Completion Date</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alltask?.map((task) => (
                            <tr
                                key={task._id}
                                className="border-b border-gray-200 hover:bg-gray-100 text-sm"
                            >
                                <td className="p-4">{task._id}</td>
                                <td className="p-4">{task.user}</td>
                                <td className="p-4">{task.requiredWorker}</td>
                                <td className="p-4">${task.payableAmount}</td>
                                <td className="p-4">{task.completionDate}</td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    
                {/* Cards for medium and small screens */}
                <div className="md:hidden">
                    {alltask?.map((task) => (
                        <div
                            key={task._id}
                            className="border border-gray-200 shadow-lg rounded-lg p-4 mb-4 "
                        >
                            <p>
                                <strong>Task ID:</strong> {task._id}
                            </p>
                            <p>
                                <strong>User Name:</strong> {task.user}
                            </p>
                            <p>
                                <strong>Required Workers:</strong> {task.requiredWorker}
                            </p>
                            <p>
                                <strong>Payable Amount:</strong> ${task.payableAmount}
                            </p>
                            <p>
                                <strong>Completion Date:</strong> {task.completionDate}
                            </p>
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="bg-red-500 text-white rounded-full p-2 mt-4 hover:bg-red-600 transition w-full text-center"
                            >
                                <FaTrash className="inline mr-2" /> Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
};

export default ManageTask;
