import React from 'react';
import useRole from '../AllHooks/useRole';

const Profile = () => {
  const { userdata } = useRole();

  if (!userdata) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className=" shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={userdata.imgurl}
            alt={userdata.name}
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
          <h1 className="mt-4 text-3xl font-bold">{userdata.name}</h1>
          <p className="">{userdata.email}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className='text-center'>
            <h2 className="text-xl font-semibold">Role</h2>
            <p>{userdata.role}</p>
          </div>
          <div className='text-center'>
            <h2 className="text-xl font-semibold">Coins</h2>
            <p>{userdata.coin}</p>
          </div>
          {/* Add any additional information if needed */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
