import { config } from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import connectDB from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";
import commissionRouter from "./router/commissionRouter.js";
import auctionItemRouter from "./router/auctionItemRoutes.js"
import superAdminRouter from "./router/superAdminRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import payment from "./router/paymentRouter.js"
// import { verifyCommissionCron } from "./automation/verifyComissionCrone.js";
const app=express()
config({
  path: "./config/.env",
});
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/",
}));
app.use("/api/v1/user",userRouter);
app.use("/api/v1/auctionitem",auctionItemRouter);
app.use("/api/v1/bid",bidRouter);
app.use("/api/v1/superadmin", superAdminRouter);
app.use("/api/payment",payment);
app.use("/api/user",commissionRouter);

endedAuctionCron();
connectDB();

app.use(errorMiddleware);



export default app