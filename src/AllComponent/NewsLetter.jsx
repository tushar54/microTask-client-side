import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Simulating API request (Replace this with your backend API call)
    setTimeout(() => {
      setMessage('Thank you for subscribing!');
      setEmail('');
    }, 1000);
  };

  return (
    <div className=" py-10">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold  mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">
          Stay updated with the latest tasks, opportunities, and platform updates.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            className="w-full sm:w-auto flex-1 px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
        {message && <p className="text-green-600 mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default Newsletter;
