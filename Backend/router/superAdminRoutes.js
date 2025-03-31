import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  deleteAuctionItem,
  fetchAllUsers,
  monthlyRevenue
} from "../controllers/superAdminController.js";

const router = express.Router();

router.delete(
  "/auctionitem/delete/:id",
  isAuthenticated,
  isAuthorized("Super Admin"),
  deleteAuctionItem
);

router.get(
    "/users/getall" ,
    isAuthenticated,
    isAuthorized("Super Admin"),
    fetchAllUsers
)

router.get(
    "/monthlyincome" ,
    isAuthenticated,
    isAuthorized("Super Admin"),
    monthlyRevenue
)


export default router;