import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import { FaTrash } from 'react-icons/fa6';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allUsers, isLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUser');
            return res.data;
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            await axiosSecure.delete(`/allUser/${userId}`);
        },
        onSuccess: () => {
            refetch();
        },
    });

    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            await axiosSecure.patch(`/updateStatus/${userId}`, { role: newRole });
        },
        onSuccess: () => {
            refetch();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Role updated successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    const handleDelete = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUserMutation.mutate(userId);
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
        });
    };

    const handleRoleChange = (userId, newRole) => {
        updateRoleMutation.mutate({ userId, newRole });
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-200 shadow-lg">
                    <thead className="bg-gray-200 text-sm text-gray-600">
                        <tr>
                            <th className="p-4 text-left">User Name & Image</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Coins</th>
                            <th className="p-4 text-center">Change Role</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers?.map((user) => (
                            <tr
                                key={user._id}
                                className="border-b border-gray-200 hover:bg-gray-100 text-sm"
                            >
                                <td className="flex items-center gap-4 p-4">
                                    <div className="w-12 h-12">
                                        <img
                                            src={user.imgurl}
                                            alt="User"
                                            className="rounded-full border w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                    </div>
                                </td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4 capitalize">{user.role}</td>
                                <td className="p-4">{user.coin}</td>
                                <td className="p-4 text-center">
                                    <select
                                        className="border rounded-md p-2 text-sm"
                                        defaultValue={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="worker">Worker</option>
                                    </select>
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
