import {User} from "../models/UserSchema.model.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

export const trackComissionStatus = catchAsyncErrors(async (req, res, next) => {
    const user=await User.findById(req.user._id);
     if(user.unpaidCommission){
         return next(new ErrorHandler("Youi have unpaid commissions. Please pay them before posting a new auction.", 400));
     }
    next();
    });




