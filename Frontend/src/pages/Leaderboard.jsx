import Spinner from "./HomeSubComponents/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <>
   
      <section className="w-full min-h-screen bg-[#F8F9FA] flex">
        {/* Sidebar Offset */}
        <div className="hidden lg:block lg:w-[280px]"></div>
        
       
        <div className="flex-1 p-6">
          <div className="w-full max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
            {loading ? (
              <Spinner />
            ) : (
              <>
               
                <div className="text-center mb-6">
                  <h1 className="text-[#1E3A8A] text-5xl font-bold">
                    Bidders Leaderboard
                  </h1>
                </div>
                <div className="overflow-x-auto">
  <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
    <thead>
      <tr className="bg-[#1E3A8A] text-white text-left">
        <th className="py-4 px-6 w-20">Rank</th>
        <th className="py-4 px-6 w-28">Profile</th>
        <th className="py-4 px-6 w-1/4">Username</th>
        <th className="py-4 px-6 w-1/4">Bid Expenditure</th>
        <th className="py-4 px-6 w-1/4">Auctions Won</th>
      </tr>
    </thead>
    <tbody className="text-gray-700">
      {leaderboard.slice(0, 100).map((element, index) => (
        <tr key={element._id} className="border-b border-gray-300 hover:bg-gray-100 transition-all">
          <td className="py-4 px-6">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold
              ${index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-gray-200"}`}>
              {index + 1}
            </div>
          </td>
          <td className="py-4 px-6">
            <img
              src={element.profileImage?.url}
              alt={element.userName}
              className="h-12 w-12 object-cover rounded-full border-2 border-[#1E3A8A]"
            />
          </td>
          <td className="py-4 px-6 font-medium">{element.userName}</td>
          <td className="py-4 px-6 font-semibold text-[#1E3A8A]">{element.moneySpent}</td>
          <td className="py-4 px-6 font-semibold">{element.auctionWon}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
