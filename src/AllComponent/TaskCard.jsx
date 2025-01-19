import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ data }) => {
    const {
        taskTitle,
        user,
        completionDate,
        payableAmount,
        requiredWorkers,
        _id,
    } = data;

    return (
        <div>
            <div className="border rounded-lg shadow-md p-4 bg-white">
                <h2 className="text-lg font-semibold mb-2">{taskTitle}</h2>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Buyer Name:</span> {user}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Completion Date:</span> {completionDate}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Payable Amount:</span> ${payableAmount}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Required Workers:</span> {requiredWorkers}
                </p>
                <Link to={`/Dashboard/taskDetails/${_id}`}>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        View Details
                    </button></Link>
            </div>
           
        </div>
    );
};

export default TaskCard;