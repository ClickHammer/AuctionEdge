import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { User } from "../models/UserSchema.model.js";

const router = express.Router();


router.get("/commission", isAuthenticated, isAuthorized("Auctioneer"), async (req, res) => {
    try {
        const {  id: userId } = req.user; 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            unpaidCommission: user.unpaidCommission || 0,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
