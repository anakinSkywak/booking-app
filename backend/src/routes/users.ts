import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const Router = express.Router();

Router.post("/dangky",[
    check("firstname", "firstname không được để trống").isString(),
    check("lastName", "lastName không được để trống").isString(),
    check("email", "email không được để trống").isEmail(),
    check("password", "password chứa ít nhất 16 ký tự").isLength({ min:6 }),
], async (req : Request , res : Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array() })
    }
    try{
        // await để xử lý bất đồng bộ
        let user = await User.findOne({
            email: req.body.email
        });

        if(user){
            return res.status(400).json({message: "User không tồn tại"})
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign({userID: user.id},
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn : "1d"
            }
        )

        res.cookie("auth_token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });
        return res.status(200).send({message: "user dang ky thanh cong"});
    }catch(err){
        console.log(err);
        res.status(500).send({message: "có điều gì đó đã sảy ra"})
    }
})

export default Router;