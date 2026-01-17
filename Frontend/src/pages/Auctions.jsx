import Card from "./HomeSubComponents/custom-components/Card";
// import Spinner from "./HomeSubComponents/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
       <div className="text-center mt-20 text-xl text-blue-800">Loading...</div>
      ) : (
        <article className="w-full min-h-screen px-5 pt-20 transition-all duration-300 lg:pl-[320px] bg-[#F8F9FA] shadow-lg">
          {/* Auction Header */}
          <section className="mb-8 text-center">
            <h1 className="text-[#1E3A8A] text-4xl font-bold sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl">
              Auctions
            </h1>
          </section>

          {/* Auction Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {allAuctions.map((element) => (
              <Card
                key={element._id}
                title={element.title}
                startTime={element.startTime}
                endTime={element.endTime}
                imgSrc={element.image?.url}
                startingBid={element.startingBid}
                id={element._id}
              />
            ))}
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;
