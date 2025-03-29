import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "/src/Pages/HomeSubComponents/custom-components/Spinner.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-screen px-6 pt-20 lg:pl-[320px] flex flex-col gap-10 bg-gray-100 text-gray-900">
          <h1 className="text-blue-600 text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-center">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Monthly Total Payments Received
              </h3>
              <PaymentGraph />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Users
              </h3>
              <BiddersAuctioneersGraph />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Payment Proofs
              </h3>
              <PaymentProofs />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Delete Items From Auction
              </h3>
              <AuctionItemDelete />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;