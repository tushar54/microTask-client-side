import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../AllHooks/useAuth';
import axios from 'axios';

const Navbar = () => {
    const [userdata, setUserdata] = useState({})
    const { currentUser, Out } = useAuth()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/oneUser${currentUser?.email}`);
                setUserdata(res.data)
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (currentUser) {
            fetchUser();
        }
    }, [currentUser]);

    console.log(userdata)

    const { role, coin, imgurl, name, email
    } = userdata || {}
    const SignOut = () => {
        Out()
            .then(() => { })
            .catch((error) => console.log(error))
    }


    const section = <div className='lg:flex justify-center items-center gap-1'>
        {
            currentUser ? <p className=' border-2 px-2 py-1 rounded-sm flex justify-center items-center font-bold text-lg'>${userdata?.coin}</p> : ''
        }
        <NavLink to={'/'} className='border-2 border-blue-600 px-3 py-3 rounded-md'>Home</NavLink>
        {
            currentUser?<NavLink className='border-2 border-blue-600 px-3  rounded-md'>Junior As <br /> Developer</NavLink>:<NavLink className='border-2 border-blue-600 px-3 py-3 rounded-md'>Junior As Developer</NavLink>
        }


        {
            currentUser ? <>
                <NavLink to={'/Dashboard'}><button className='text-lg border-2 border-blue-600 px-2 py-1 rounded-md'>Dashboard</button></NavLink>


            </> : ''
        }
        {
            currentUser ? <>
                <div className='md:flex space-y-1 items-center gap-3 '>
                    <Link className='text-lg border-2 border-blue-600 px-2 py-1 rounded-md' onClick={SignOut}>
                        <button>LogOut</button>
                    </Link>
                    <img referrerPolicy='no-referrer' className='w-[40px] h-[40px] rounded-full' src={imgurl} alt="" />
                </div>
            </> :
                <Link to={'/login'}><button className='text-lg border-2 border-blue-600 px-3 py-2 rounded-md'>Log-in</button></Link>
        }
    </div>


    return (
        <div>
            <div className="container mx-auto fixed z-30 navbar top-0 bg-base-100 border-b-2 border-b-blue-500 pb-5">
                <div className="navbar-start">

                    <Link to={'/'} className="btn btn-ghost text-xl">miCroTask</Link>
                </div>

                <div className='navbar-end flex justify-end items-center'>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu absolute right-2 menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 space-y-2  shadow flex flex-col justify-start items-start *:w-full">
                            {section}
                        </ul>
                    </div>
                    <div className=" hidden lg:flex">
                        <ul className="menu menu-horizontal space-x-3 px-1">
                            {section}
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Navbar;