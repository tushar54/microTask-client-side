import React from 'react';
import Navbar from '../AllComponent/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../AllComponent/Footer';
import Bannar from '../AllComponent/Bannar';
import BestWorker from '../AllComponent/BestWorker';
import FeedbackSlider from '../AllComponent/FeedbackSlider';
import StatsSection from '../AllComponent/StastSection';
import InfoSection from '../AllComponent/InfoSection';
import BlogSection from '../AllComponent/Blog';
import Newsletter from '../AllComponent/NewsLetter';

const Home = () => {
    const location = useLocation()
  
    return (
        <div>
            <div className='container mx-auto'>
                <Navbar></Navbar>
            </div>
            {location.pathname === '/' && 
               <> <Bannar></Bannar>
                <BestWorker></BestWorker>
                <InfoSection></InfoSection>
                <FeedbackSlider></FeedbackSlider>
                <StatsSection></StatsSection>
                <BlogSection></BlogSection>
                <Newsletter></Newsletter>
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