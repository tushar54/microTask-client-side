import React from 'react';
import Navbar from '../AllComponent/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../AllComponent/Footer';

const Home = () => {
    return (
        <div>
            <div className='container mx-auto'>
                <Navbar></Navbar>
            </div>
            <div className='min-h-[600px] pt-16 '>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;