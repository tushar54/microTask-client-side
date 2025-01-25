import React from 'react';
import Navbar from '../AllComponent/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../AllComponent/Footer';
import Bannar from '../AllComponent/Bannar';
import BestWorker from '../AllComponent/BestWorker';
import FeedbackSlider from '../AllComponent/FeedbackSlider';
import StatsSection from '../AllComponent/StastSection';
import InfoSection from '../AllComponent/InfoSection';

const Home = () => {
    const location = useLocation()
    console.log(location.pathname)
    return (
        <div>
            <div className='container mx-auto'>
                <Navbar></Navbar>
            </div>
            {location.pathname === '/' && 
               <> <Bannar></Bannar>
                <BestWorker></BestWorker>
                <FeedbackSlider></FeedbackSlider>
                <StatsSection></StatsSection>
                <InfoSection></InfoSection>
                </>
            }
           
            
            <div className='pt-16 '>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;