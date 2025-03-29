import React from "react";

const About = () => {
  const steps = [
    {
      title: "Seamless User Experience",
      description:
        "AuctionEdge provides a smooth and intuitive interface for users to bid on auctions in real time and stay updated with live bidding activity.",
    },
    {
      title: "Real-Time Bidding",
      description:
        "Our platform ensures that bidders receive live updates and notifications as auctions progress, allowing for competitive and fair bidding.",
    },
    {
      title: "Secure Transactions",
      description:
        "We prioritize security, ensuring that all payments and commissions are handled transparently through verified payment methods.",
    },
  
    {
      title: "Repost Unsold Items",
      description:
        "If an item remains unsold due to non-payment, the auctioneer can easily relist it at no additional cost.",
    },
  ];

  return (
    <section className="w-full ml-0 m-0 h-fit px-12 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-6 justify-center bg-gray-100">
      <h1 className="text-blue-900 text-4xl font-bold mb-6 text-center">About AuctionEdge</h1>
      <p className="text-lg text-gray-800 text-center max-w-3xl mx-auto">
        AuctionEdge is a dynamic auction platform where bidders can participate in auctions with real-time updates, secure transactions, and a seamless experience for both bidders and auctioneers.
      </p>
      <div className="flex flex-col gap-6 my-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-blue-200 hover:border-blue-700 transition-all">
            <h3 className="text-blue-900 text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
