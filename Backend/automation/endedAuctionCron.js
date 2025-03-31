import cron from "node-cron";
import { Auction } from "../models/AuctionSchema.model.js";
import { User } from "../models/UserSchema.model.js";
import { Bid } from "../models/bidSchema.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false
    });
    
    console.log(endedAuctions);
    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        const auctionId = await Auction.findById(auction._id).select("createdBy");
        const userID=auctionId.createdBy;
        await User.updateOne({ _id: userID }, { $inc: { unpaidCommission: commissionAmount } });
        console.log(commissionAmount)


        

        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });
       const auctioneer = await User.findById(auction.createdBy);
       // // auctioneer.unpaidCommission = commissionAmount;
        
        if (highestBidder) {
          
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();
          const bidder = await User.findById(highestBidder.bidder.id);
          // await User.updateOne({ _id: userID }, { $inc: { unpaidCommission: commissionAmount } });
          await User.updateOne
            ({ _id: bidder.id },
            {
              $inc: {
                auctionWon: 1,
                moneySpent:auction.currentBid,
              },
            },
            { new: true }
          );
          // await User.findByIdAndUpdate(
          //   auctioneer._id,
          //   { new: true }
          // );
          let subject = `Congratulations! You won the auction for ${auction.title}`;
          
          let message =  `Subject: 🎉 Congratulations! You Won the Auction for ${auction.title}  

          Dear ${bidder.userName},  
          
          Great news! 🎊 You are the highest bidder and have won the auction for **${auction.title}** at **${auction.currentBid}**! 🏆  
          
          📌 **Auction Summary:**  
          - **Item Name:** ${auction.title}  
          - **Winning Bid Amount:** ${auction.currentBid}  
          - **Auctioneer:** ${auctioneer.userName}  
          - **Auctioneer’s Contact:** ${auctioneer.email}  
          
          💳 **Next Steps: Complete Your Payment**  
          To claim your item, please complete your payment using one of the following methods:  
          
          1️⃣ **Bank Transfer:**  
          - **Account Name:** ${auctioneer.paymentMethods.bankTransfer.bankAccountHolderName}  
          - **Account Number:** ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}  
          - **Bank:** ${auctioneer.paymentMethods.bankTransfer.bankName}  
          - **IFSC Code:** ${auctioneer.paymentMethods.bankTransfer.ifscCode}  
          
          2️⃣ **UPI Payment:**  
          - **Send payment to:** ${auctioneer.paymentMethods.upi.upiId}  
          
          3️⃣ **Cash on Delivery (COD):**  
          - You must pay **20%** of the total amount upfront before delivery.  
          - Use any of the above methods to make the upfront payment.  
          - The remaining **80%** will be paid upon delivery.  
          - If you wish to inspect the item before payment, contact the auctioneer at **${auctioneer.email}**.  
          
          ⏳ **Payment Deadline:** [Insert Payment Due Date]  
          Once payment is confirmed, your item will be shipped to you.  
          
          🚀 **Congratulations on Your Winning Bid!**  
          We appreciate your participation in **AuctionEdge**. If you have any questions or need assistance, feel free to contact our support team.  
          
          Best regards,  
          ⚡ **The AuctionEdge Team**`;  
            
          console.log("SENDING EMAIL TO HIGHEST BIDDER",bidder.userName);
          console.log("A6");
          sendEmail({ email: bidder.email, subject, message });
          subject = `Your Auction for ${auction.title} Has Been Completed Successfully!`;
          message = `Subject: 🎉 Your Auction for ${auction.title} Has Been Completed Successfully!

          Dear ${auctioneer.userName},

          Great news! 🏆 Your auction for **${auction.title}** has successfully ended, and the highest bid reached **${auction.currentBid}**. 🎊

          📌 **Auction Summary:**
          - **Item Name:** ${auction.title}
          - **Final Bid Amount:** ${auction.currentBid}
          - **Winning Bidder:** ${bidder.userName}
          - **Bidder’s Contact:** ${bidder.email}

          💰 **Next Steps: Collect Your Payment**  
          The winning bidder has been notified and is required to complete the payment using one of the provided payment methods. You may also directly reach out to the bidder to finalize the transaction.

          📢 **Your Commission Details:**  
          As per our platform policy, a commission of **** has been applied. Your updated account balance will reflect accordingly.

          🚀 **Congratulations on a Successful Auction!**  
          Thank you for using **AuctionEdge** to list your item. We look forward to hosting more of your auctions in the future! If you have any questions, feel free to contact our support team.

          Best regards,  
          ⚡ **The AuctionEdge Team**`;

          sendEmail({ email: auctioneer.email, subject, message });
          console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
        } else {
          await auction.save();
        }
      } catch (error) {
        return next(console.error(error || "Some error in ended auction cron"));
      }
    }
  });
};