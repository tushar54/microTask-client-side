import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../AllHooks/useAuth';
import axios from 'axios';

const Taskdetails = () => {
  const task = useLoaderData()
  const { currentUser } = useAuth()
  const [submissionDetails, setSubmissionDetails] = useState('');
  const navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      task_id: task._id,
      task_title: task.taskTitle,
      payable_amount: task.payableAmount,
      worker_email: currentUser.email,
      worker_name: currentUser.displayName,
      buyer_name: task.user, // Assuming task.user is the buyer name
      buyer_email: task.user,
      submission_details: submissionDetails,
      current_date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      status: 'pending',
    };
console.log(submissionData)
    try {
      const response = await axios.post('http://localhost:5000/submissions', submissionData);
      if (response.status === 200) {
        alert('Submission successfully saved!');
        setSubmissionDetails(''); 
        navigate('/Dashboard/workerTaskList')
      }
    } catch (error) {
      console.error('Error submitting the task:', error);
      alert('Failed to submit the task. Please try again.');
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{task.taskTitle}</h1>
      <img src={task.taskImageUrl} alt={task.taskTitle} className="w-full h-60 object-cover rounded-md mb-4" />
      <p><strong>Task Detail:</strong> {task.taskDetail}</p>
      <p><strong>Required Workers:</strong> {task.requiredWorkers}</p>
      <p><strong>Payable Amount:</strong> ${task.payableAmount}</p>
      <p><strong>Completion Date:</strong> {task.completionDate}</p>
      <p><strong>Buyer Email:</strong> {task.user}</p>

      {/* Submission Form */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Submit Your Work</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="submissionDetails" className="block font-medium">Submission Details</label>
            <textarea
              id="submissionDetails"
              name="submissionDetails"
              value={submissionDetails}
              onChange={(e) => setSubmissionDetails(e.target.value)}
              rows="4"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Taskdetails;