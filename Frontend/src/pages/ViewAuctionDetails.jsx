import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import Spinner from "./HomeSubComponents/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full min-h-screen px-6 pt-20 lg:pl-[320px] flex flex-col bg-white text-gray-900">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <Link to="/" className="hover:text-bg-[#15317E]">Home</Link>
        <FaGreaterThan className="text-gray-400" />
        <Link to="/view-my-auctions" className="hover:text-bg-[#15317E]">My Auctions</Link>
        <FaGreaterThan className="text-gray-400" />
        <span className="text-blue-600">{auctionDetail.title}</span>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-full md:w-40 md:h-40 flex justify-center items-center bg-gray-200 p-5 rounded-lg">
                <img src={auctionDetail.image?.url} alt={auctionDetail.title} className="max-h-full" />
              </div>
              <div className="flex flex-col justify-around">
                <h3 className="text-2xl font-bold text-gray-800">{auctionDetail.title}</h3>
                <p className="text-lg font-semibold">Condition: <span className="text-bg-[#15317E]">{auctionDetail.condition}</span></p>
                <p className="text-lg font-semibold">Minimum Bid: <span className="text-bg-[#15317E]">Rs.{auctionDetail.startingBid}</span></p>
              </div>
            </div>
            <h4 className="text-xl font-bold mt-6">Auction Item Description</h4>
            <hr className="my-2 border-t border-gray-400" />
            <ul className="list-disc pl-5 text-lg text-gray-700">
              {auctionDetail.description?.split(". ").map((element, index) => (
                <li key={index} className="mb-2">{element}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <header className="bg-[#15317E] text-white py-4 text-2xl font-semibold text-center rounded-t-lg">BIDS</header>
            <div className="bg-white p-4 min-h-[400px] rounded-b-lg">
              {auctionBidders && auctionBidders.length > 0 && new Date(auctionDetail.startTime) < Date.now() && new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.map((element, index) => (
                  <div key={index} className="py-2 flex items-center justify-between border-b border-gray-300">
                    <div className="flex items-center gap-4">
                      <img src={element.profileImage} alt={element.userName} className="w-12 h-12 rounded-full" />
                      <p className="text-lg font-semibold">{element.userName}</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">Rs. {element.amount}</p>
                    <p className={`text-lg font-semibold ${index === 0 ? "text-green-600" : index === 1 ? "text-blue-600" : index === 2 ? "text-yellow-600" : "text-gray-600"}`}>
                      {index === 0 ? "1st" : index === 1 ? "2nd" : index === 2 ? "3rd" : `${index + 1}th`}
                    </p>
                  </div>
                ))
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img src="/notStarted.png" alt="not-started" className="w-full" />
              ) : (
                <img src="/auctionEnded.png" alt="ended" className="w-full" />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewAuctionDetails;