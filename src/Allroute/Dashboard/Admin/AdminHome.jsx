import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../AllHooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all pending withdrawal requests
  const {
    data: withdrawalRequests,
    isLoading: isWithdrawLoading,
    refetch,
  } = useQuery({
    queryKey: ["withdrawRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/withdrawRequests?status=pending");
      return res.data;
    },
  });

  // Fetch all information stats
  const {
    data: allinfo,
    isLoading: isInfoLoading,
    refetch: refetchInfo,
  } = useQuery({
    queryKey: ["allinfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allinformation`);
      return res.data;
    },
  });

  // Mutation to handle payment success
  const paymentSuccessMutation = useMutation({
    mutationFn: async ({ requestId, withdrawalAmount, workerEmail }) => {
      await axiosSecure.patch(`/withdrawRequests${requestId}`, {
        withdrawalAmount,
        workerEmail,
      });
    },
    onSuccess: () => {
      refetch();
      refetchInfo();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment processed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Insufficiant coin",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        showConfirmButton: true,
      });
    },
  });
  

  const handlePaymentSuccess = (requestId, withdrawalAmount, workerEmail) => {
    paymentSuccessMutation.mutate({ requestId, withdrawalAmount, workerEmail });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Stats Section */}
      <div className="mb-8">
        {isInfoLoading ? (
          <p className="text-center text-gray-600">Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className=" shadow-md rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">Total Worker</h3>
              <p className="text-2xl font-bold text-gray-900">{allinfo?.result}</p>
            </div>
            <div className=" shadow-md rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">Total Buyer</h3>
              <p className="text-2xl font-bold text-gray-900">{allinfo?.result1}</p>
            </div>
            <div className=" shadow-md rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Total Available Coin
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                Coin: {allinfo?.totalCoins}
              </p>
            </div>
            <div className=" shadow-md rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">Total Payments</h3>
              <p className="text-2xl font-bold text-gray-900">{allinfo?.result2}</p>
            </div>
          </div>
        )}
      </div>

      {/* Withdrawal Requests Table */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Pending Withdrawal Requests
        </h3>
        {isWithdrawLoading ? (
          <p className="text-center text-gray-600">Loading withdrawal requests...</p>
        ) : (
          <div className="overflow-x-auto  shadow-md rounded-lg">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border p-3 text-left">Worker Name</th>
                  <th className="border p-3 text-left">Worker Email</th>
                  <th className="border p-3 text-left">Payment System</th>
                  <th className="border p-3 text-left">Account Number</th>
                  <th className="border p-3 text-left">Withdrawal Amount</th>
                  <th className="border p-3 text-left">Withdrawal Coin</th>
                  <th className="border p-3 text-left">Withdraw Date</th>
                  <th className="border p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalRequests?.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-100">
                    <td className="border p-3">{request.worker_name}</td>
                    <td className="border p-3">{request.worker_email}</td>
                    <td className="border p-3">{request.payment_system}</td>
                    <td className="border p-3">{request.account_number}</td>
                    <td className="border p-3">{request.withdrawal_amount}</td>
                    <td className="border p-3">{request.withdrawal_coin}</td>
                    <td className="border p-3">
                      {new Date(request.withdraw_date).toLocaleDateString()}
                    </td>
                    <td className="border p-3 text-center">
                      <button
                        onClick={() =>
                          handlePaymentSuccess(
                            request._id,
                            request.withdrawal_coin,
                            request.worker_email
                          )
                        }
                        className={`${
                          paymentSuccessMutation.isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white px-4 py-2 rounded`}
                        disabled={paymentSuccessMutation.isLoading}
                      >
                        {paymentSuccessMutation.isLoading
                          ? "Processing..."
                          : "Payment Success"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
