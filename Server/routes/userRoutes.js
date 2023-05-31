import express from "express";
import bcrypt from "bcrypt";
import registerSchema from "../models/registerSchema.js";
import { userModel } from "../models/userModel.js";

const router = express.Router();


router.post("/register", async (req, res) => {

    const { firstName, lastName, email, password, confirmPassword } = req.body;
    console.log("req body", req.body);
    try {
        const validation = registerSchema({
            firstName,
            email,
            password,
            confirmPassword,
        });
        console.log(validation);
        console.log(Object.keys(validation).length);
        //if validation fails
         if (Object.keys(validation).length > 0) {
            return res.status(202).json({ message: "Something went wrong! Please try again." })
        };

        // If validation passes,
        const isUserAlreadyRegistered = await userModel.findOne({ email })
        if (isUserAlreadyRegistered) {
            return res.status(202).json({ message: "Email already Registered..." })
        }

        // If user is not already registered 
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({ firstName, lastName, email, password: hashedPassword })

        const userSave = await newUser.save()

        // Return success response
        res.status(200).json({ message: "Registered Successfully" })

    } catch (error) {
        res.status(400).json({ message: "Something went wrong! Please try again." })
    }

})

export default router;