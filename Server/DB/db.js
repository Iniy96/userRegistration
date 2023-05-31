import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const BASEURL =process.env.MONGOURL

export const Connection=async()=>{
    try {
        await mongoose.connect(BASEURL,{useNewUrlParser:true});
        console.log("Mongo db Conncted");
    } catch (error) {
        console.log("Error while connecting Database ....",error);
    }
}
