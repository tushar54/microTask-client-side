import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../AllHooks/useAuth';
import axios from 'axios';

const Navbar = () => {
    const [userdata,setUserdata]=useState({})
    const { currentUser, Out } = useAuth()
    // console.log(currentUser?.email)
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
    //   console.log(userdata)
    const {role,coin,imgurl,name,email
    }=userdata||{}
      


    const section = <>
        <li><a>Home</a></li>
        <li><a>Home 2</a></li>
        <li><a> Junior as developer</a></li>
        {
            currentUser?<>
          <Link to={'/Dashboard'}><li>Dashboard</li></Link>


            </>:''
        }
    </>

    const SignOut = () => {
        Out()
            .then(() => { })
            .catch((error) => console.log(error))
    }
    return (
        <div className="container mx-auto fixed z-30 navbar bg-base-100 border-b-2 border-b-blue-500">
            <div className="navbar-start">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            section
                        }
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl">miCroTask</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {section}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    currentUser ? <><div className='flex justify-center items-center gap-4'><Link className='text-lg border-2 border-green-400 px-3 py-2 rounded-md' onClick={SignOut}><button>LogOut</button></Link> <img referrerPolicy='no-referrer' className='w-[50px] h-[50px] rounded-full' src={imgurl} alt="" /></div></> : <Link to={'/login'}><button>Log-in</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;