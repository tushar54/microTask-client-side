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
    <div>
      {!selectedPackage ? (
        <div className="grid gap-10 justify-center items-center md:grid-cols-2 lg:grid-cols-4 text-lg">
          {coinPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="w-[200px] h-[200px] text-center space-y-4 border-2 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg"
              onClick={() => setSelectedPackage(pkg)}
            >
              <p>{pkg.coins} Coins</p>
              <p>${pkg.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-center mb-4">
            You selected {selectedPackage.coins} Coins for ${selectedPackage.price}
          </h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm selectedPackage={selectedPackage} />
          </Elements>
          <button
            onClick={() => setSelectedPackage(null)}
            className="mt-4 px-4 py-2 bg-red-600 text-white font-bold rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerPurchaseCoin;
