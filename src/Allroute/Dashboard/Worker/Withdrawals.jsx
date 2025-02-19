import React, { useState } from 'react';
import useRole from '../../../AllHooks/useRole';
import useAxiosSecure from '../../../AllHooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Withdrawals = () => {
  const axiosSecure = useAxiosSecure();
  const { userdata, refetch } = useRole();
  const dollar = (userdata.coin / 20).toFixed(2);
  const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleCoinInputChange = (e) => {
    const coins = Number(e.target.value);
    setCoinsToWithdraw(coins);
    setWithdrawalAmount((coins / 20).toFixed(2));
  };

  const resetForm = () => {
    setCoinsToWithdraw(0);
    setWithdrawalAmount(0);
    setPaymentSystem('');
    setAccountNumber('');
  };

  const handleWithdraw = async () => {
    if (coinsToWithdraw < 200 || coinsToWithdraw > userdata.coin) {
      alert('Invalid withdrawal amount.');
      return;
    }

    const withdrawalData = {
      worker_email: userdata.email,
      worker_name: userdata.name,
      withdrawal_coin: coinsToWithdraw,
      withdrawal_amount: withdrawalAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString(),
      status: 'pending',
    };

    try {
      setIsLoading(true); // Set loading to true
      const response = await axiosSecure.post('/withdrawRequest', withdrawalData);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Payment Successful',
        showConfirmButton: false,
        timer: 1500,
      });
      resetForm();
      refetch();
     
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6  rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Withdrawals</h2>

      <div className="mb-4">
        <p className="text-lg">User Total Coins: <span className="font-semibold">{userdata.coin}</span></p>
        <p className="text-lg">Total Earnings: <span className="font-semibold">${dollar}</span></p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Coin to Withdraw</label>
          <input
            type="number"
            value={coinsToWithdraw}
            onChange={handleCoinInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            min="200"
            max={userdata.coin}
            placeholder="Enter coins to withdraw"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Withdrawal Amount ($)</label>
          <input
            type="number"
            value={withdrawalAmount}
            readOnly
            className="mt-1 p-2 border border-gray-300 rounded w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Select Payment System</label>
          <select
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="" disabled>Select Payment System</option>
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter your account number"
          />
        </div>

        {userdata.coin < 200 ? (
          <p className="text-red-600 text-sm">Insufficient coins (minimum 200 coins required).</p>
        ) : (
          <button
            onClick={handleWithdraw}
            className={`mt-4 bg-blue-500 text-white px-6 py-2 rounded-full w-full transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Withdraw'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Withdrawals;
