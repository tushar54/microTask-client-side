import React, { useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useRole from '../../../AllHooks/useRole';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BuyerTask = () => {
    const { currentUser } = useAuth();
    const { refetch: Refetch } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [updatedData, setUpdatedData] = useState({
        taskTitle: '',
        taskDetail: '',
        completionDate: ''
    });

    const { data: taskData, isLoading, refetch } = useQuery({
        queryKey: ['userAllTask', currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyerAlltask?email=${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    const handleModalOpen = (task) => {
        setSelectedTask(task);
        setUpdatedData({
            taskTitle: task.taskTitle,
            taskDetail: task.taskDetail,
            completionDate: task.completionDate
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosSecure.patch(`/updateTask${selectedTask._id}`, updatedData);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (data) => {
        const { _id } = data;
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/deleteBuyerTask${_id}`, {
                        data: {
                            email: currentUser?.email,
                            requiredWorkers: data.requiredWorkers,
                            payableAmount: data.payableAmount,
                        }
                    });
                    refetch();
                    Refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
        
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-sm text-gray-600">
                            <th className="p-2 text-left">Task Title</th>
                            <th className="p-2 text-left">Required Workers</th>
                            <th className="p-2 text-left">Payable Amount</th>
                            <th className="p-2 text-left">Completion Date</th>
                            <th className="p-2 text-center">Edit</th>
                            <th className="p-2 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskData?.map((data) => (
                            <tr key={data._id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{data?.taskTitle}</td>
                                <td className="p-2">{data?.requiredWorkers}</td>
                                <td className="p-2">{data?.payableAmount}</td>
                                <td className="p-2">{data?.completionDate}</td>
                                <td
                                    onClick={() => handleModalOpen(data)}
                                    className="p-2 text-xl text-blue-500 cursor-pointer text-center"
                                >
                                    <FaEdit />
                                </td>
                                <td
                                    onClick={() => handleDelete(data)}
                                    className="p-2 text-xl text-red-500 cursor-pointer text-center"
                                >
                                    <MdDeleteForever />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-75 flex justify-center items-start overflow-y-auto pt-10 pb-10">
                    <div className=" rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <h2 className="text-xl font-semibold mb-4 text-center">Edit Task</h2>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                        >
                            ✕
                        </button>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Task Title</label>
                                <input
                                    type="text"
                                    name="taskTitle"
                                    value={updatedData.taskTitle}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Task Detail</label>
                                <textarea
                                    name="taskDetail"
                                    value={updatedData.taskDetail}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Completion Date</label>
                                <input
                                    type="date"
                                    name="completionDate"
                                    value={updatedData.completionDate}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerTask;
