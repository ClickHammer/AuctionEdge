import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [40, "Username must be at most 40 characters long"],
      required: true,
    },
    password: {
      type: String,
      select: false,
      minLength: [8, "Password must be at least 8 characters long"],
      maxLength: [32, "Password must be at most 32 characters long"],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
     
    },
    phone: {
      type: String,
      minLength: [10, "Phone number must be at least 10 characters long"],
      maxLength: [10, "Phone number must be at most 10 characters long"],
     
    },
    profileImage: {
      public_id: {
        type: String,
      
      },
      url: {
        type: String,
       
      },
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber: { type: String },
        bankName: { type: String },
        ifscCode: { type: String },
        bankAccountHolderName: { type: String },
      },
      upi: {
        upiId: { type: String },
      },
    },
    role: {
      type: String,
      enum: ['Auctioneer', 'Bidder', 'Admin'],
      default: 'Bidder',
    },
    unpaidCommission: {
      type: Number,
      default: 0,
    },
    auctionWon: {
      type: Number,
      default: 0,
    },
    moneySpent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
