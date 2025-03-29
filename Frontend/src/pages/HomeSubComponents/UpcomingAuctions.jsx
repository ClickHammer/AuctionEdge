import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <section className="my-8 p-6 bg-[#15317E] text-white rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold text-center mb-6">Today's Auctions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctionsStartingToday.length > 0 ? (
          auctionsStartingToday.map((auction) => (
            <Link
              to={`/auction/item/${auction._id}`}
              key={auction._id}
              className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={auction.image?.url}
                  alt={auction.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-[#15317E]">{auction.title}</h4>
                  <p className="text-gray-600">Starting Bid: <span className="font-bold">Rs. {auction.startingBid}</span></p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-700 font-semibold">Starting Time:</p>
                <p className="text-gray-800 text-sm">{new Date(auction.startTime).toLocaleString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-lg font-semibold col-span-3">No auctions available for today.</p>
        )}
      </div>
    </section>
  );
};

export default UpcomingAuctions;
