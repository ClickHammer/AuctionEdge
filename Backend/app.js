import { config } from "dotenv"
import express from "express"
import cors from "cors"
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

export default app