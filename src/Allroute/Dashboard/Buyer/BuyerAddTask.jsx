import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useQueryForBuyer from '../../../AllHooks/useQueryForBuyer';
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const BuyerAddTask = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [uploading, setUploading] = useState(false);
    const [taskImageUrl, setTaskImageUrl] = useState('');
    
    const {userdata,refetch}=useQueryForBuyer()

   console.log(userdata)
  
console.log(userdata)
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
                name:userdata.displayName,
                taskImageUrl,
                taskTitle,
                taskDetail,
                requiredWorkers,
                payableAmount,
                completionDate,
                submissionInfo,
            };

            const res=await axios.post('http://localhost:5000/Addtask', taskData);
            console.log(res.data)
            alert('Task added successfully!');
            reset();
            setTaskImageUrl('');
            refetch();
        
            
        } catch (error) {
            alert('Error adding task. Please try again!');
        }
    };
 

    return (
        <section className="task-form-section space-y-3">
            <h2 className='text-center'>Add Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="task-form space-y-4">
                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col w-1/2'>
                        <label>Task Title</label>
                        <input type="text" {...register('taskTitle', { required: 'Task title is required' })} />
                        {errors.taskTitle && <span>{errors.taskTitle.message}</span>}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label>Task Detail</label>
                        <textarea {...register('taskDetail', { required: 'Task detail is required' })} />
                        {errors.taskDetail && <span>{errors.taskDetail.message}</span>}
                    </div>
                </div>

                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col w-1/2'>
                        <label>Required Workers</label>
                        <input type="number" {...register('requiredWorkers', { required: true, valueAsNumber: true })} />
                        {errors.requiredWorkers && <span>Required workers is required</span>}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label>Payable Amount (per worker)</label>
                        <input type="number" {...register('payableAmount', { required: true, valueAsNumber: true })} />
                        {errors.payableAmount && <span>Payable amount is required</span>}
                    </div>
                </div>

                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col w-1/2'>
                        <label>Completion Date</label>
                        <input type="date" {...register('completionDate', { required: true })} />
                        {errors.completionDate && <span>Completion date is required</span>}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label>Submission Info</label>
                        <textarea {...register('submissionInfo', { required: true })} />
                        {errors.submissionInfo && <span>Submission info is required</span>}
                    </div>
                </div>

                <div>
                    <label>Task Image</label>
                    <input type="file" {...register('image', { required: true })} accept="image/*" onChange={handleImageUpload} />
                    {uploading && <p>Uploading image...</p>}
                    {errors.image && <span>Image info is required</span>}
                </div>

                <button type="submit" disabled={uploading} className='btn bg-yellow-600'>
                    {uploading ? 'Uploading...' : 'Add Task'}
                </button>
            </form>
        </section>
    );
};

export default BuyerAddTask;
