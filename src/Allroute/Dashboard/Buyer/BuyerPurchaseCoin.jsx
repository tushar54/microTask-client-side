import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const BuyerPurchaseCoin = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const coinPackages = [
    { id: 'pkg1', coins: 10, price: 1 },
    { id: 'pkg2', coins: 150, price: 10 },
    { id: 'pkg3', coins: 500, price: 20 },
    { id: 'pkg4', coins: 1000, price: 35 },
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {!selectedPackage ? (
        <div className="grid gap-10 justify-center items-center md:grid-cols-2 lg:grid-cols-4 text-lg">
          {coinPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="w-[200px] h-[200px] text-center space-y-4 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-300 transform hover:scale-105 p-4"
              onClick={() => setSelectedPackage(pkg)}
            >
              <p className="font-semibold text-xl">{pkg.coins} Coins</p>
              <p className="text-lg text-gray-700">${pkg.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center  p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            You selected {selectedPackage.coins} Coins for ${selectedPackage.price}
          </h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm selectedPackage={selectedPackage} />
          </Elements>
          <button
            onClick={() => setSelectedPackage(null)}
            className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-md shadow-md hover:bg-red-700 transition duration-300"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerPurchaseCoin;
