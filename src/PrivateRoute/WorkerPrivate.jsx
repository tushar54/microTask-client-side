import React from 'react';
import useRole from '../AllHooks/useRole'
import { Navigate } from 'react-router-dom';
const AdminPrivate = ({ children }) => {
    const { userdata, isLoading } = useRole()
    if (isLoading) {
        return <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    if(userdata?.role==='worker')return children
    return (
        <Navigate to={'/login'}></Navigate>
    );
};

export default AdminPrivate;