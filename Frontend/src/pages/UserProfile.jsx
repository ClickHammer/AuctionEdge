// import Spinner from "./HomeSubComponents/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-gray-100">
        {loading ? (
         <div className="text-center mt-20 text-xl text-blue-800">Loading...</div>
        ) : (
          <>
            <div className="bg-white mx-auto w-full max-w-4xl shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                <img src={user.profileImage?.url} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.userName}</h2>
              <p className="text-gray-500">{user.role}</p>

              <div className="w-full mt-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <InfoField label="Email" value={user.email} />
                  <InfoField label="Phone" value={user.phone} />
                  <InfoField label="Address" value={user.address} />
                  <InfoField label="Joined On" value={user.createdAt?.substring(0, 10)} />
                  
                </div>
              </div>
              {user.role === "Bidder" && (
                <div className="w-full mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Bidding Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InfoField label="Auctions WON" value={user.auctionWon} />
                    <InfoField label="Money Spent" value={user.moneySpent} />
                    
                  </div>
                </div>
              )}
              {user.role === "Auctioneer" && (
                <div className="w-full mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Payment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InfoField label="Bank Name" value={user.paymentMethods.bankTransfer.bankName} />
                    <InfoField label="Bank Account " value={user.paymentMethods.bankTransfer.bankAccountNumber} />
                    <InfoField label="Bank Account Holder" value={user.paymentMethods.bankTransfer.bankAccountHolderName} />
                    <InfoField label="IFSC Code" value={user.paymentMethods.bankTransfer.ifscCode} />
                    <InfoField label="UPI Id" value={user.paymentMethods.upi.upiId} />
                    <InfoField label="Unpaid Commissions" value={user.unpaidCommission} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

const InfoField = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg shadow-sm border">
    <p className="text-sm font-medium text-gray-600">{label}</p>
    <p className="text-md font-semibold text-gray-800">{value || "N/A"}</p>
  </div>
);

export default UserProfile;
