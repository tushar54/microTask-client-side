import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import { FaTrash } from 'react-icons/fa6';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUser = () => {
    const axiosSecure=useAxiosSecure()
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
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
        },
    });

    const handleDelete = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
           
            if (result.isConfirmed) {
                deleteUserMutation.mutate(userId);
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
              }
          });
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
