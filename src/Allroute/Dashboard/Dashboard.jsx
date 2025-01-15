import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../../AllComponent/DashboardNavbar';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../AllHooks/useAuth';

const Dashboard = () => {
    const [userdata, setUserdata] = useState({})
    const { currentUser, Out } = useAuth()
    const { role } = userdata;
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
    return (
        <div className='container mx-auto'>
            <DashboardNavbar data={userdata} ></DashboardNavbar>
            <div className='grid grid-cols-8'>
                <div className='col-span-2'>
                    {
                        role === 'worker' && <> 
                        <Link>Task List</Link> <br />
                        <Link>My Submissions</Link> <br />
                        <Link>withdrawals</Link>
                        </>
                    }
                    {
                        role==='buyer'&&
                        <>
                         <Link>Add new Tasks</Link> <br />
                         <Link>My Task’s</Link> <br />
                         <Link>Purchase Coin</Link>
                        </>
                    }
                    {
                        role==='admin'&&
                        <>
                         <Link to={"manageuser"}>Manage User</Link> <br />
                         <Link to={"managetask"}>Manage Task</Link>
                        </>
                    }
                </div>
                <div className='col-span-5'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;