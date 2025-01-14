import mongoose from "mongoose";
const DB_NAME = "AuctionEdge";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MongoDB connection Successful");   
      
    } catch (error) {
        console.error("MongoDB connection Failed:", error);
        process.exit(1); 
    }
};

export default connectDB;