import express from 'express';
import Razorpay from 'razorpay';
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { User } from '../models/UserSchema.model.js';
import {Payment} from '../models/Payment.model.js';

const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_qMsZ3nSLQnmel1',
    key_secret:'IUq0nqWPBRRaxivAqQNlr6H6',
});
router.post('/order', isAuthenticated, isAuthorized("Auctioneer"), async (req, res) => {
    try {
        const { id: userId } = req.user; 
        const user = await User.findById(userId);

        if (!user || user.unpaidCommission === 0) {
            return res.json({
                success: false,
                message: "No Commission Found"
            });
        }

        const options = {
            amount: Math.round(user.unpaidCommission * 100),

            currency: "INR",
            receipt: userId,  
        };
        console.log(userId);

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

router.post("/verify", async (req, res) => {
    

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        

      
        const order = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found in Razorpay" });
        }
        
        const userId = order.receipt;
        
        if (!userId) {
            return res.status(400).json({ message: "User ID not found in order receipt" });
        }
        
      
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found in database" });
        }
        
      
        const newPayment = new Payment({
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
            amount: order.amount / 100,  
            user: user._id.toString()
        });
        user.unpaidCommission = 0;

        await newPayment.save();

    
       
        await user.save();

        return res.status(200).json({ message: "Payment Successful, Commission Cleared!" });
    } catch (error) {
        console.error("Error in verification:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/history", isAuthenticated, async (req, res) => {
    try {
        const { id: userId } = req.user;
        const payments = await Payment.find({ user: userId }).sort({ createdAt: -1 });


        return res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error("Error fetching payment history:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;