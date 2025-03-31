import mongoose from 'mongoose';


const PaymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount:{
        type:Number,
        required:true,
    },
    user: {
         type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    required:true,

      },

});
export const Payment = mongoose.model("Payment", PaymentSchema);