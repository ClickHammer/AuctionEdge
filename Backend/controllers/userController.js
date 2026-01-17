import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/UserSchema.model.js";
import {v2 as cloudinary}from "cloudinary";
import { generateToken } from "../utils/jwtTokens.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files ||Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Profile Image required.", 400));

    }
    const { profileImage } = req.files;
    const allowedExtensions = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedExtensions.includes(profileImage.mimetype)) {
        return next(new ErrorHandler("Invalid file format.", 400));
    }
    const { 
        userName,
        email,
        password,
        phone,
        address,
        role, 
        bankAccountNumber, 
        bankName, 
        ifscCode, 
        bankAccountHolderName, 
        upiId,
        } = req.body;
    if (!userName || !email || !password || !phone || !address || !role) {
        return next(new ErrorHandler("All fields are required.", 400));
    }
    if (role === "Auctioneer" && (!bankAccountNumber || !bankName || !ifscCode || !bankAccountHolderName||!upiId)) {
        return next(new ErrorHandler("Please provide Bank Details", 400));
    }
    const isRegistered=await User.findOne({
        email
    });
    if(isRegistered){
        return next(new ErrorHandler("User already exists", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        profileImage.tempFilePath,
        {
            folder: "AuctionEdge",
        }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary error :",cloudinaryResponse.error || "Unknown cloudinary name.");
        return next(new ErrorHandler("Profile Image upload failed.", 500));
    }
    const user=await User.create({
        userName,
        email,
        password,
        phone,
        address,
        role,
        profileImage:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
        paymentMethods:{
            bankTransfer:{
                bankAccountNumber,
                bankName,
                ifscCode,
                bankAccountHolderName,
            },
            upi:{
                upiId,
            },
        },
    }
    );
    generateToken(user,"User Registered Successfully",201,res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email or password",400));
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid credentials",401));

    }
    const isPasswordmatched=await user.comparePassword(password);
    if(!isPasswordmatched){
        return next(new ErrorHandler("Invalid credentials",401));
    }
    generateToken(user,"User logged in successfully",200,res);

});
export const getProfile = catchAsyncErrors(async (req, res,next) => {
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    })
});
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      secure: true,       // MUST match login cookie
      sameSite: "none",   // MUST match login cookie
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const fetchLeaderboard = catchAsyncErrors(async (req, res, next) => {
    
        const users = await User.find({ moneySpent: { $gt: 0 } });
        const leaderboard = users.sort((a, b) => b.moneySpent - a.moneySpent);
        res.status(200).json({
          success: true,
          leaderboard,
        });
      });
