import  {addNewAuctionItem, getAllItems, getAuctionDetails, getMyAuctionItems, removeFromAuction, republishItem, getdetails} from "../controllers/AuctionController.js"
import express from "express";
import { isAuthenticated,isAuthorized } from "../middlewares/auth.js";
import { trackComissionStatus } from "../middlewares/trackComissionStatus.js";


const router=express.Router();
router.post("/create",isAuthenticated,isAuthorized("Auctioneer"),trackComissionStatus,addNewAuctionItem);
router.get("/allitems",getAllItems);
router.get("/auction/:id",isAuthenticated,getAuctionDetails);
router.get("/myitems",isAuthenticated,isAuthorized("Auctioneer"),getMyAuctionItems)
router.delete("/delete/:id",isAuthenticated,isAuthorized("Auctioneer"),removeFromAuction);
router.put("/item/republish/:id",isAuthenticated,isAuthorized("Auctioneer"),republishItem);
router.post("/auctioniddetails",isAuthenticated,getdetails);
export default router;
