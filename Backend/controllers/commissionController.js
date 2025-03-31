import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/AuctionSchema.model.js";
import mongoose from "mongoose";

export const calculateCommission = async (auctionId) => {
  const auction = await Auction.findById(auctionId);
  if (!mongoose.Types.ObjectId.isValid(auctionId)) {
    return next(new ErrorHandler("Invalid Auction Id format.", 400));
  }
  const commissionRate = 0.05;
  const commission = auction.currentBid * commissionRate;
  return commission;
};
