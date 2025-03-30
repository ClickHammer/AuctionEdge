import CardTwo from "./HomeSubComponents/custom-components/CardTwo";
import Spinner from "./HomeSubComponents/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated, navigateTo, user?.role]);

  return (
    <div 
      className={`w-full min-h-screen px-5 pt-20 bg-gray-50 transition-all duration-300 
        ${isSidebarOpen ? "lg:ml-[320px]" : "lg:pl-[320px]"}`}
      style={{ zIndex: 10 }} // Lower zIndex to prevent overlay issues
    >
      <h1 className="text-blue-900 text-5xl font-extrabold mb-6">My Auctions</h1>
      
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap gap-6 relative z-1">
          {myAuctions.length > 0 ? (
            myAuctions.map((element) => (
              <CardTwo
                key={element._id}
                title={element.title}
                startingBid={element.startingBid}
                endTime={element.endTime}
                startTime={element.startTime}
                imgSrc={element.image?.url}
                id={element._id}
                className="overflow-hidden"
              />
            ))
          ) : (
            <h3 className="text-gray-600 text-2xl font-semibold mt-5">
              You have not posted any auctions yet.
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMyAuctions;
