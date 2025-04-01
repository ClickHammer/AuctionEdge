import React from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Users must register to access the features of AuctionEdge ",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Notification",
      description:
        "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer,UPI Id",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Payment",
      description:
        "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and when paid then Auctioneer can place a new Auction.",
    },
  
    {
      icon: <FaRedo />,
      title: "Reposting Items",
      description:
        "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
    },
  ];

  return (
    <section className="w-full px-6 pt-16 lg:pl-[320px] flex flex-col min-h-screen py-6 bg-gray-50 text-black">
      <h1 className="text-gray-800 text-4xl font-bold mb-6 text-center">
        How AuctionEdge Operates
      </h1>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {steps.map((element, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-md border-l-8 border-[#15317E] transition-all duration-300 hover:shadow-lg"
          >
            <div className="bg-[#15317E] text-white p-4 text-2xl rounded-full w-fit shadow-sm transition-colors duration-300 hover:bg-[#7D6115]">
              {element.icon}
            </div>
            <h3 className="text-[#15317E] text-xl font-bold transition-colors duration-300 hover:text-[#7D6115]">
              {element.title}
            </h3>
            <p className="text-gray-700">{element.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;