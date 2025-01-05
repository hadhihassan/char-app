import express from 'express';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json({limit :"10mb"}));
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

if (process.env.NODE_ENV === "production") {
    // app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    // });
}

app.listen(PORT, () => {
    console.log("Server is runing on 5001");
    connectDB()
})