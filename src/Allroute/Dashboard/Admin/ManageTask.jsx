import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';

const ManageTask = () => {
    const axiosSecure=useAxiosSecure()

    const { data: alltask, refetch } = useQuery({
        queryKey: ['AllTaskforAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allTaskForAdmin')
            return res.data
        }
    })

    const handleDelete=async(id)=>{
        console.log(id)
        const result=await axiosSecure.delete(`/DeleteTaskbyadmin/${id}`)
        refetch()
        console.log(result.data)
    }
    console.log(alltask)
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Task-Id</th>
                        <th>User Name</th>
                        <th>Required Worker</th>
                        <th>Payable-Amount</th>
                        <th>Completion-Date</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        alltask?.map(task => 
                        <tr>
                           
                            <td>{task._id}</td>
                            <td>{task.user}</td>
                            <td>{task.requiredWorker}</td>
                            <td>{task.payableAmount}</td>
                            <td>{task.completionDate}</td>
                            <td><button onClick={()=>handleDelete(task._id)}><FaDeleteLeft></FaDeleteLeft></button></td>
                            
                        
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageTask;