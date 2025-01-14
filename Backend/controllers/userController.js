import ErrorHandler from "../middlewares/error";
import { User } from "../models/UserSchema.model";
import {v2 as cloudinary} from "../utils/cloudinary";
export const register = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
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
    if (role === "Auctioneer" && (!bankAccountNumber || !bankName || !ifscCode || !bankAccountHolderName)) {
        return next(new ErrorHandler("Please provide Bank Details", 400));
    }
    if(!upiId){
        return next(new ErrorHandler("Please provide UPI ID", 400));
    }

    const isRegistered=await User.findOne({
        email
    });
    if(isRegistered){
        return next(new ErrorHandler("User already exists", 400));
    }
    const cloudinaryResponse = await v2.uploader.upload(
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
    res.status(201).json({
        success:true,
        message:"User registered successfully"
    });
    





};