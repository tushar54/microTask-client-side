import React from 'react';
import Navbar from '../AllComponent/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../AllComponent/Footer';

const Home = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='min-h-[600px]'>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;