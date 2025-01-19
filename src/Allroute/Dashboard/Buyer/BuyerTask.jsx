import React, { useState } from 'react';
import useAuth from '../../../AllHooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useQueryForBuyer from '../../../AllHooks/useQueryForBuyer';

const BuyerTask = () => {
    const { currentUser } = useAuth();
    const {refetch:Refetch}=useQueryForBuyer()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        taskTitle: '',
        taskDetail: '',
        completionDate: ''
    });

    const { data: taskData, isLoading, refetch } = useQuery({
        queryKey: ['userAllTask', currentUser?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/buyerAlltask?email=${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });

    const handleModalOpen = (task) => {
        console.log(task)
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
            const res=await axios.patch(`http://localhost:5000/updateTask${selectedTask._id}`, updatedData);
            console.log(res.data)
            refetch();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    const handleDelete=async(data)=>{
        const {_id}=data
        try{
            const res=await axios.delete(`http://localhost:5000/deleteBuyerTask${_id}`,
                {
                    data: {
                        email: currentUser?.email,  
                        requiredWorkers: data.requiredWorkers,
                        payableAmount: data.payableAmount,

                    }
                }
            )
            console.log(res.data)
            refetch()
            Refetch()
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Required Workers</th>
                            <th>Payable Amount</th>
                            <th>Completion Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskData?.map((data) => (
                            <tr key={data._id}>
                                <td>{data?.taskTitle}</td>
                                <td>{data?.requiredWorkers}</td>
                                <td>{data?.payableAmount}</td>
                                <td>{data?.completionDate}</td>
                                <td
                                    onClick={() => handleModalOpen(data)}
                                    className='text-xl text-blue-500 cursor-pointer'
                                >
                                    <FaEdit />
                                </td>
                                <td onClick={()=>handleDelete(data)} className='text-xl text-red-500 cursor-pointer'>
                                    <MdDeleteForever />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive Edit Modal */}
            {isModalOpen && (
                <div className=" overflow-hidden overflow-y-scroll fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
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
