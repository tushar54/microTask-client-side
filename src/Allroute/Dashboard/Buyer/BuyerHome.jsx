import React from 'react';
import useAuth from '../../../AllHooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FcApprove, FcRemoveImage, FcViewDetails } from 'react-icons/fc';
import { CiCircleRemove } from "react-icons/ci";

const BuyerHome = () => {
    const { currentUser } = useAuth()
    const { data: userdata, isLoading, refetch } = useQuery({
        queryKey: ['buyerpendingtask', currentUser?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/alltaskForbuyer?email=${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email,
    });
    console.log(userdata)


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Worker Name</th>
                            <th>Title</th>
                            <th>Payable Amount</th>
                            <th>Submission Details</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            userdata?.map(data => 
                            <tr className=" space-y-4">
                                <th>{data.worker_name}</th>
                                <th>{data.task_title}</th>
                                <th>{data.payable_amount}</th>
                                <th className='text-2xl'><FcViewDetails></FcViewDetails></th>
                                <td className='flex gap-2 text-2xl'>
                                    <FcApprove></FcApprove>
                                   <CiCircleRemove></CiCircleRemove>
                                </td>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BuyerHome;