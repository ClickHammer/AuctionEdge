// import Spinner from "./HomeSubComponents/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section className="w-full min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row p-4 sm:p-6">
      {/* Sidebar Offset for larger screens */}
      <div className="hidden lg:block lg:w-[280px] xl:w-[300px] 2xl:w-[350px]"></div>
      
      <div className="flex-1 w-full max-w-7xl bg-white shadow-xl rounded-2xl p-4 sm:p-8 overflow-hidden">
        {loading ? (
         <div className="text-center mt-20 text-xl text-blue-800">Loading...</div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-[#1E3A8A] text-2xl sm:text-4xl font-bold">Bidders Leaderboard</h1>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="bg-[#1E3A8A] text-white text-left">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Profile</th>
                    <th className="py-3 px-4">Username</th>
                    <th className="py-3 px-4">Bid Expenditure</th>
                    <th className="py-3 px-4">Auctions Won</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {leaderboard.slice(0, 100).map((element, index) => (
                    <tr
                      key={element._id}
                      className="border-b border-gray-300 hover:bg-gray-100 transition-all"
                    >
                      <td className="py-3 px-4">
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-white font-semibold
                            ${index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-gray-200"}`}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <img
                          src={element.profileImage?.url}
                          alt={element.userName}
                          className="h-8 w-8 sm:h-12 sm:w-12 object-cover rounded-full border-2 border-[#1E3A8A]"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium break-words">{element.userName}</td>
                      <td className="py-3 px-4 font-semibold text-[#1E3A8A]">{element.moneySpent}</td>
                      <td className="py-3 px-4 font-semibold">{element.auctionWon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;