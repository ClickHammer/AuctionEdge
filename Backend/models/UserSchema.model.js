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
      enum: ['Auctioneer', 'Bidder', 'Super Admin'],
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
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
//export const User= mongoose.model('User', UserSchema);

