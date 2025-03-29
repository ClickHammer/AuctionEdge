import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <section className="my-8 lg:px-5">
      <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2 items-center">
        <h3 className="text-[#15317E] text-2xl font-bold mb-2 md:text-3xl lg:text-4xl">
          Top 10
        </h3>
        <h3 className="text-[#D6482B] text-2xl font-bold mb-2 md:text-3xl lg:text-4xl">
          Bidders Leaderboard
        </h3>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-[#15317E] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Rank</th>
              <th className="py-3 px-6 text-left">Profile Pic</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Bid Expenditure</th>
              <th className="py-3 px-6 text-left">Auctions Won</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-lg">
            {leaderboard.slice(0, 10).map((element, index) => (
              <tr
                key={element._id}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-all`}
              >
                <td className="py-3 px-6 font-bold text-[#15317E]">#{index + 1}</td>
                <td className="py-3 px-6">
                  <img
                    src={element.profileImage?.url}
                    alt={element.username}
                    className="h-12 w-12 object-cover rounded-full border-2 border-[#15317E]"
                  />
                </td>
                <td className="py-3 px-6 font-semibold">{element.userName}</td>
                <td className="py-3 px-6 font-semibold text-[#D6482B]">Rs. {element.moneySpent}</td>
                <td className="py-3 px-6 font-semibold text-black">{element.auctionWon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        to="/leaderboard"
        className="block text-center mt-5 bg-[#15317E] border-2 text-white text-lg font-bold py-3 rounded-md hover:bg-white hover:border-blue-900  hover:text-blue-900 "
      >
        View Full Leaderboard
      </Link>
    </section>
  );
};

export default Leaderboard;