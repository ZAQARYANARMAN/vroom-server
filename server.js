import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routers/userRouter.js";
import carRouter from "./routers/carRouter.js";
dotenv.config();
import "./connectDB.js";

const server = express();

server.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));
server.use(express.json());
server.use(cookieParser());
server.use("/uploads", express.static(path.join("uploads")));
server.use("/user", userRouter);
server.use("/car", carRouter);

server.listen(process.env.PORT)