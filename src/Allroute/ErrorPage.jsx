import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='h-[100vh] flex justify-center items-center'>
          <h1 className=' text-4xl font-bold'>404</h1>
          <Link to={'/'} className='btn'>Go back</Link>
        </div>
    );
};

export default ErrorPage;