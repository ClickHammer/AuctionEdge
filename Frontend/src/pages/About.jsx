import React from "react";

const About = () => {
 const steps = [
     {
      
       title: "User Registration",
       description:
         "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
     },
     {
       
       title: "Role Selection",
       description:
         'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
     },
     {
       
       title: "Winning Bid Notification",
       description:
         "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal.",
     },
     {
       
       title: "Commission Payment",
       description:
         "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.",
     },
     {
       
       title: "Proof of Payment",
       description:
         "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
     },
     {
       
       title: "Reposting Items",
       description:
         "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
     },
   ];
 
   return (
     <>
   <section className="w-full ml-0 m-0 h-fit px-12 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-6 justify-center ">
   <h1
   className="bg-gradient-to-r from-[#d6482b]  to-[#ff8c42] bg-clip-text text-transparent text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-6xl py-2"
 >
 About Us
 </h1>
 
 
   
 
   <div className="flex flex-col gap-9 my-7">
     {steps.map((element, index) => {
       return (
         <div
           key={index}
           className="bg-white rounded-md p-10 lg:p-5 flex flex-col gap-2 group shadow-lg"
         >
           
           <h3
             className="text-[#D6482B] text-lg font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-2xl group-hover:text-[#000000] transition-all duration-300"
           >
             {element.title}
           </h3>
           <p className="text-lg text-gray-700 group-hover:text-[#D6482B] transition-all duration-300">
             {element.description}
           </p>
         </div>
       );
     })}
   </div>
 </section>
 
 
     </>
   );
};

export default About;
