import { config } from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import connectDB from "./database/connection.js";

const app=express()
config({
  path: "./config/.env",
});
connectDB();
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
//alternative for mutter because of easy syntax

app.use(express.static("public"));


export default app