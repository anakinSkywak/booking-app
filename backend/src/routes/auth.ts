import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/dangnhap", [
    check("email", "email không được để trống").isEmail(),
    check("password", "password chứa ít nhất 6 ký tự").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user không tồn tại" });
        }
         // Logic nếu mật khẩu khớp
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không chính xác" });
        }

        const token = jwt.sign({ userId: user.id }, 
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn : '1d',
            }
        )

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000

        })
        res.status(200).json({ userId: user._id })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Có lỗi xảy ra" });
    }
})

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId })
});

router.post("/dangxuat", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
})

export default router;
