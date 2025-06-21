import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useRole from '../../../AllHooks/useRole';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import axios from 'axios';
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const BuyerAddTask = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [uploading, setUploading] = useState(false);
    const [taskImageUrl, setTaskImageUrl] = useState('');
    const axiosSecure = useAxiosSecure();
    
    const { userdata, refetch } = useRole();

    // Handle image upload
    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        setUploading(true);
        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
            setTaskImageUrl(response.data.data.url);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image.');
        }
        setUploading(false);
    };

    // Handle form submission
    const onSubmit = async (data) => {
        const { taskTitle, taskDetail, requiredWorkers, payableAmount, completionDate, submissionInfo } = data;
        const totalPayableAmount = requiredWorkers * payableAmount;

        if (totalPayableAmount > userdata?.coin) {
            alert('Not enough coins. Please purchase more.');
            return;
        }
       
        try {
            const taskData = {
                user: userdata?.email,
                name: userdata.displayName,
                taskImageUrl,
                taskTitle,
                taskDetail,
                requiredWorkers,
                payableAmount,
                completionDate,
                submissionInfo,
            };

            const res = await axiosSecure.post('/Addtask', taskData);
           
            alert('Task added successfully!');
            reset();
            setTaskImageUrl('');
            refetch();
        } catch (error) {
            alert('Error adding task. Please try again!');
        }
    };

    return (
        <section className="task-form-section space-y-6 max-w-4xl mx-auto p-6  shadow-lg rounded-lg">
            <h2 className="text-center text-2xl font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="task-form space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="taskTitle" className="font-semibold">Task Title</label>
                        <input
                            id="taskTitle"
                            type="text"
                            {...register('taskTitle', { required: 'Task title is required' })}
                            className="mt-2 p-3 border border-gray-300 rounded-md"
                        />
                        {errors.taskTitle && <span className="text-red-500 text-sm">{errors.taskTitle.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="taskDetail" className="font-semibold">Task Detail</label>
                        <textarea
                            id="taskDetail"
                            {...register('taskDetail', { required: 'Task detail is required' })}
                            className="mt-2 p-3 border border-gray-300 rounded-md"
                        />
                        {errors.taskDetail && <span className="text-red-500 text-sm">{errors.taskDetail.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="requiredWorkers" className="font-semibold">Required Workers</label>
                        <input
                            id="requiredWorkers"
                            type="number"
                            {...register('requiredWorkers', { required: 'Required workers is required',valueAsNumber: true })}
                            className="mt-2 p-3 border border-gray-300 rounded-md"
                        />
                        {errors.requiredWorkers && <span className="text-red-500 text-sm">Required workers is required</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="payableAmount" className="font-semibold">Payable Amount (per worker)</label>
                        <input
                            id="payableAmount"
                            type="number"
                            {...register('payableAmount', { required: 'Payable amount is required',valueAsNumber: true })}
                            className="mt-2 p-3 border border-gray-300 rounded-md"
                        />
                        {errors.payableAmount && <span className="text-red-500 text-sm">Payable amount is required</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="completionDate" className="font-semibold">Completion Date</label>
                        <input
                            id="completionDate"
                            type="date"
                            {...register('completionDate', { required: 'Completion date is required' })}
                            className="mt-2 p-3 border border-gray-300 rounded-md"
                        />
                        {errors.completionDate && <span className="text-red-500 text-sm">Completion date is required</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="submissionInfo" className="font-semibold">Submission Info</label>
                        <textarea
                            id="submissionInfo"
                            {...register('submissionInfo', { required: 'Submission info is required' })}
                            className="mt-2 p-3 border border-gray-300 rounded-md"
                        />
                        {errors.submissionInfo && <span className="text-red-500 text-sm">Submission info is required</span>}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="image" className="font-semibold">Task Image</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...register('image', { required: 'Image is required' })}
                        onChange={handleImageUpload}
                        className="mt-2 p-3 border border-gray-300 rounded-md"
                    />
                    {uploading && <p className="text-yellow-600 mt-2">Uploading image...</p>}
                    {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={uploading}
                        className="mt-4 bg-yellow-500 text-white py-3 px-8 rounded-md hover:bg-yellow-600 transition-all"
                    >
                        {uploading ? 'Uploading...' : 'Add Task'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default BuyerAddTask;
