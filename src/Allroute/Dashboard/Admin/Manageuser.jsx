import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { FaTrash } from 'react-icons/fa6';

const ManageUser = () => {
    const { data: allUsers, isLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/allUser');
            return res.data;
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            await axios.delete(`http://localhost:5000/allUser/${userId}`);
        },
        onSuccess: () => {
            refetch();
        },
    });

    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            await axios.patch(`http://localhost:5000/updateStatus/${userId}`, { role: newRole });
        },
        onSuccess: () => {
            refetch();
        },
    });

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUserMutation.mutate(userId);
        }
    };

    const handleRoleChange = (userId, newRole) => {
        updateRoleMutation.mutate({ userId, newRole });
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-center">
                            <th>UserName & Image</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Coin</th>
                            <th>Change Role</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUsers?.map((user) => (
                            <tr className="text-center" key={user._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.imgurl} alt="User Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.coin}</td>
                                <td>
                                    <select
                                        className="select select-bordered select-sm"
                                        defaultValue={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >

                                      
                                        <option value="admin">Admin</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="worker">Worker</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(user._id)}
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
