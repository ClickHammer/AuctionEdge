import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./HomeSubComponents/FeaturedAuctions";
import UpcomingAuctions from "./HomeSubComponents/UpcomingAuctions";
import Leaderboard from "./HomeSubComponents/Leaderboard";
import Spinner from "./HomeSubComponents/custom-components/Spinner";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center border border-blue-400">
     
          <h1 className="text-blue-900 text-5xl font-extrabold mb-2">Transparent Auctions</h1>
          <h1 className="text-blue-600 text-5xl font-extrabold mb-6">Be The Winner</h1>
          <div className="flex gap-6 justify-center">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-blue-900 font-semibold rounded border-2 hover:border-blue-600 hover:bg-white hover:text-blue-900 rounded-lg px-8 py-3 text-white transition-all duration-300 shadow-md text-lg"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="text-blue-900 border-2 border-blue-600 bg-white hover:bg-blue-900 hover:text-white font-bold rounded-lg px-8 py-3 transition-all duration-300 shadow-md text-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-12">
          <h3 className="text-blue-900 text-3xl font-semibold text-center">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {howItWorks.map((element) => (
              <div
                key={element.title}
                className="bg-white flex flex-col gap-3 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-300"
              >
                <h5 className="font-extrabold text-xl text-blue-900">{element.title}</h5>
                <p className="text-black text-lg">{element.description}</p>
              </div>
            ))}
          </div>
        </div>
        <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
      </section>
    </>
  );
};

export default Home;
