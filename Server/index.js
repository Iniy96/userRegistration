import express from "express"
import { Connection } from "./DB/db.js"
import cors from "cors"
import router from "./routes/userRoutes.js"
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT

const app = express()
Connection()

app.use(express.json())
app.use(cors())


app.use("/auth",router)
app.get("/",(req,res)=>{
    res.json("Server Started")
})

app.listen(PORT,()=>console.log("SERVER STARTED..."))