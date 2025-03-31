import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/UserSchema.model.js"
import { Auction } from "../models/AuctionSchema.model.js"
import { Payment } from "../models/Payment.model.js"
import mongoose from "mongoose"

export const deleteAuctionItem = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid Id format.", 400));
    }
    const auctionItem = await Auction.findById(id);
    if (!auctionItem) {
      return next(new ErrorHandler("Auction not found.", 404));
    }
    await auctionItem.deleteOne();
    res.status(200).json({
      success: true,
      message: "Auction item deleted successfully.",
    });
  });

  export const fetchAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $month: "$createdAt" },
            role: "$role",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          role: "$_id.role",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { year: 1, month: 1 },
      },
    ]);
  
    const bidders = users.filter((user) => user.role === "Bidder");
    const auctioneers = users.filter((user) => user.role === "Auctioneer");
  
    const tranformDataToMonthlyArray = (data, totalMonths = 12) => {
      const result = Array(totalMonths).fill(0);
  
      data.forEach((item) => {
        result[item.month - 1] = item.count;
      });
  
      return result;
    };
  
    const biddersArray = tranformDataToMonthlyArray(bidders);
    const auctioneersArray = tranformDataToMonthlyArray(auctioneers);
  
    res.status(200).json({
      success: true,
      biddersArray,
      auctioneersArray,
    });
  });  

  export const monthlyRevenue = catchAsyncErrors(async (req, res, next) => {
    
    const payments = await Payment.aggregate([
      {
        $project: {
          amount: 1, 
          month: { $month: "$date" }, 
          year: { $year: "$date" },        
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" }, 
          totalAmount: { $sum: "$amount" }, 
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, 
      },
    ]);
  
   
    const transformDataToMonthlyArray = (payments, totalMonths = 12) => {
      const result = Array(totalMonths).fill(0); 
  
     
      payments.forEach((payment) => {
      
        result[payment._id.month - 1] = payment.totalAmount;
      });
  
      return result;
    };
  
  
    const totalMonthlyRevenue = transformDataToMonthlyArray(payments);
  

    res.status(200).json({
      success: true,
      totalMonthlyRevenue,
    });
  });