import express, { Request, Response } from 'express';
import cors from 'cors';
import  "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRouters from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

// khi sử dụng biến bên .env thì dùng process.env.tenBien
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("connected: ", process.env.MONGODB_CONNECTION_STRING);
    
})

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.get('/api/test', async (req : Request , res : Response) => {
    res.json({message: "hello from express"});
});

app.use(express.static(path.join(__dirname , "../../frontend/dist")))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRouters)

app.listen(process.env.POST || 7000, ()=>{
    console.log("server running on localhost: 7000");
    
})