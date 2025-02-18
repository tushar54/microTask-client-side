import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './style.css';
import useRole from '../../../AllHooks/useRole';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckoutForm = ({ selectedPackage }) => {
  const { userdata, refetch } = useRole()
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    try {
      // Request the backend to create a payment intent
      const { data: clientSecret } = await axiosSecure.post('/create-payment-intent', {
        amount: selectedPackage.price * 100, // Price in cents
        coins: selectedPackage.coins, // Coin package
      });
     
      // Confirm payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret.clientSecret, {
        payment_method: {
          card,
        },
      });
     

      if (error) {
        console.error('Payment Error:', error.message);
        alert('Payment failed. Please try again.');
      } else if (paymentIntent.status === 'succeeded') {
        // Save payment info and update coins
        await axiosSecure.post('/save-payment-info', {
          paymentIntentId: paymentIntent.id,
          coins: selectedPackage.coins,
          cost: selectedPackage.price,
          email: userdata?.email
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Payment successful! You have purchased ${selectedPackage.coins} coins.`,
          showConfirmButton: false,
          timer: 2000
        });
        refetch()

      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded"
      >
        Pay ${selectedPackage.price}
      </button>
    </form>
  );
};

export default CheckoutForm;
