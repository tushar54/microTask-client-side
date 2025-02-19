import React from "react";
import useAuth from "../AllHooks/useAuth";
import { Link } from "react-router-dom";


const InfoSection = () => {
    const { currentUser } = useAuth()
    return (
        <div className="p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Section */}
                <div className="p-8 rounded-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                        Micro Tasks - Deliver Work Make Money: This is how:
                    </h1>
                    <div className="w-12 h-1 mb-4"></div>
                    <p className=" text-base md:text-lg mb-6">
                        Take surveys, download apps, play games, or follow social media
                        apps, Picoworkers offers a diverse range of options to boost your
                        income. Whether you are a student, freelancer, or stay-at-home
                        parent our platform connects you with employers quickly and safely
                        with a seamless payment experience. Register now!<span className="text-sm text-red-400">(If you are a worker you can find A job other wise you don't )</span>
                    </p>
                    {
                        currentUser ? <Link to={'/Dashboard'} className=" text-red-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition">
                            Find A Job
                        </Link> : <Link to={'/login'} className=" text-red-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition">
                            Find A Job
                        </Link>
                    }
                </div>

                {/* Right Section */}
                <div className="relative  p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl md:text-4xl font-bold  mb-4">
                        Hire Talent in Minutes, and Get Work Done
                    </h1>
                    <div className="w-12 h-1 bg-red-600 mb-4"></div>
                    <p className="text-base md:text-lg mb-6">
                        Whether you are a company or an individual crowdsource talent for
                        your micro jobs and start getting it done in minutes. App testing,
                        surveys, promoting social media, or getting sign-ups, get it done
                        with Picoworkers – One platform for all your needs, sign-up now and
                        start creating a job!! <span className="text-sm text-red-400">(If you are a Buyer you can post A job other wise you don't )</span>
                    </p>
                    {
                        currentUser ? <Link to={'/Dashboard'} className=" text-red-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition">
                           Post A Job
                        </Link> : <Link to={'/login'} className=" text-red-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition">
                           Post A Job
                        </Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default InfoSection;
