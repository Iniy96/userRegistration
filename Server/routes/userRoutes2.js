import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

const router = express.Router()
const JWT_SECRET = "secret"

router.post("/register", async (req, res) => {
    console.log(req.body);
    const { userName, password } = req.body
    try {
        const userCheck = await userModel.findOne({userName
        })
        if (userCheck) {
            return res.json({ message: "Username already exists.." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({ userName, password: hashedPassword })
        const userSave = await newUser.save()
        res.status(200).json({ message: `Saved Successfully` })
    } catch (error) {
        res.status(409).json({ message: `Error in post request + ${error}` })
        console.error(error);
    }
})

router.post("/login",async(req,res)=>{
    const {userName,password} = req.body
    
    const userCheck = await userModel.findOne({userName})
    if(!userCheck){
        return res.json({message: "Username Not found"})
    }

    const passwordCheck = await bcrypt.compare(password,userCheck.password)
    if(!passwordCheck){
        return res.json({message: "Password worng"})
    }

    const token = jwt.sign({id: userCheck._id},JWT_SECRET)
    res.json({token, userId : userCheck._id,userName:userCheck.userName})

})

router.post("/forgot-password",async(req,res)=>{
    const {email} = req.body
    console.log(req.body);
    try {
        const userCheck = await userModel.findOne({email})
        if(!userCheck){
            return res.json({message: "Username Not found"})
        }
        
        const secret = JWT_SECRET + userCheck.password
        const token = jwt.sign({email: userCheck.email,id:userCheck._id },secret,{expiresIn:"5m"})
        const link = `http://127.0.0.1:8000/auth/reset-password/${userCheck._id}/${token}`
        console.log(link);
    } catch (error) {
        console.log(error);
    }
})

router.get(`reset-password/:id/:token`,async(req,res)=>{
    const {id,token} = req.params
    console.log(id);
    console.log(token);
    res.json("verified")
})

export default router;