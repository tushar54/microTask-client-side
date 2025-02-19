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
        <div className="p-4">
            <div className="border rounded-lg shadow-lg  transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">{taskTitle}</h2>
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Buyer Name:</span> {user}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Completion Date:</span> {completionDate}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Payable Amount:</span> ${payableAmount}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Required Workers:</span> {requiredWorkers}
                    </p>

                    <Link to={`/Dashboard/taskDetails/${_id}`}>
                        <button className="w-full sm:w-auto mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
