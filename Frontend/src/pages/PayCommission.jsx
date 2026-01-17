import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

const PayCommission = () => {
  const [unpaidCommission, setUnpaidCommission] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchUnpaidCommission = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/commission", {
          withCredentials: true,
        });
        setUnpaidCommission(res.data.unpaidCommission);
      } catch (error) {
        toast.error("Failed to fetch unpaid commission");
      }
    };

    const fetchPaymentHistory = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/payment/history", {
          withCredentials: true,
        });
        setPaymentHistory(res.data.payments);
      } catch (error) {
        toast.error("Failed to fetch payment history");
      }
    };

    fetchUnpaidCommission();
    fetchPaymentHistory();
  }, []);

  const handleCommissionPayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/payment/order",
        {},
        { withCredentials: true }
      );

      const { data } = res.data;
      console.log("ujjwal")
      console.log(res.data)
      const options = {
      
        key: "rzp_test_XdrcdRpwVqlExH",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Auction Edge",
        description: "Commission Payment",
        handler: async (response) => {
          try {
            await axios.post(
              "http://localhost:4000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            toast.success("Commission paid successfully");
            setUnpaidCommission(0);
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        theme: {
          color: "#15317E",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment initiation failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 sm:p-12 lg:p-16">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl text-center border border-gray-200">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Pay Your Commission</h2>
        <p className="text-gray-600 text-xl mb-6">
          Unpaid Commission:{" "}
          <span className="font-semibold text-black text-2xl">₹{unpaidCommission}</span>
        </p>

        {unpaidCommission > 0 && (
          <button
            onClick={handleCommissionPayment}
            className="bg-blue-500 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl mt-8 border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Payment History</h2>
        {paymentHistory.length === 0 ? (
          <p className="text-gray-500 text-lg">No previous payments found.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {paymentHistory.map((payment, index) => (
              <li
                key={payment._id}
                className={`py-4 px-6 rounded-lg ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } flex justify-between items-center`}
              >
                <span className="font-medium text-gray-700">₹{payment.amount}</span>
                <span className="text-sm text-gray-500">
                  {moment(payment.date).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PayCommission;
