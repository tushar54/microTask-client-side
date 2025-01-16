import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../AllHooks/useAuth';

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const BuyerAddTask = () => {
    const availableCoins = 200;
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [uploading, setUploading] = useState(false);
    const [taskImageUrl, setTaskImageUrl] = useState('');
    // const navigate = useNavigate();
    const { currentUser } = useAuth()
    const [userdata, setUserdata] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/oneUser?email=${currentUser?.email}`);
                setUserdata(res.data)
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (currentUser) {
            fetchUser();
        }

    }, [currentUser]);
    

    // 🔑 Replace with your actual ImageBB API key

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

    const onSubmit = async (data) => {
        const { taskTitle, taskImageUrl, taskDetail, requiredWorkers, payableAmount, completionDate, submissionInfo } = data;
       
        const totalPayableAmount = requiredWorkers * payableAmount;

        if (totalPayableAmount > availableCoins) {
            alert('Not available Coin. Purchase Coin');
            // navigate('/purchase-coin');
            return;
        }

        try {
            const taskData = {
                user:userdata.email,
                taskImageUrl,
                taskTitle,
                taskDetail,
                requiredWorkers,
                payableAmount,
                completionDate,
                submissionInfo,
                taskImageUrl,
            };

            await axios.post('http://localhost:5000/Addtask',taskData);
            alert('Task added successfully!');
            reset();
            setTaskImageUrl('');
        } catch (error) {
            alert('Error adding task. Please try again!');
        }
    };
   

    return (
        <section className="task-form-section space-y-3">
            <h2 className='text-center'>Add Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="task-form space-y-4">
                <div className='flex justify-between gap-4'>
                    <div className=' flex flex-col w-1/2'>
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
                    <div className=' flex flex-col w-1/2'>
                        <label>Required Workers</label>
                        <input type="number" {...register('requiredWorkers', { required: true, valueAsNumber: true })} />
                        {errors.requiredWorkers && <span>Required workers is required</span>}
                    </div>

                    <div className=' flex flex-col w-1/2'>
                        <label>Payable Amount (per worker)</label>
                        <input type="number" {...register('payableAmount', { required: true, valueAsNumber: true })} />
                        {errors.payableAmount && <span>Payable amount is required</span>}
                    </div>
                </div>

                <div className='flex justify-between gap-4'>
                    <div className=' flex flex-col w-1/2'>
                        <label>Completion Date</label>
                        <input type="date" {...register('completionDate', { required: true })} />
                        {errors.completionDate && <span>Completion date is required</span>}
                    </div>

                    <div className=' flex flex-col w-1/2'>
                        <label>Submission Info</label>
                        <textarea {...register('submissionInfo', { required: true })} />
                        {errors.submissionInfo && <span>Submission info is required</span>}
                    </div>
                </div>

                <div>
                    <label>Task Image</label>
                    <input type="file"{...register('image', { required: true })} accept="image/*" onChange={handleImageUpload} />
                    {uploading && <p>Uploading image...</p>}
                    {errors.image && <span>Image info is required</span>}
                    {/* {taskImageUrl && <img src={taskImageUrl} alt="Uploaded" width="150" />} */}
                </div>

                <button type="submit" disabled={uploading}>Add Task</button>
            </form>
        </section>
    );
};

export default BuyerAddTask;
