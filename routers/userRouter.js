import express from "express";
import { verifyJwt, verifyLogIn, verifyRegister } from "../middlwares/userMiddleware.js";
import { authorInfo, checkingToken, getUser, logIn, register, verifyEmail } from "../controllers/userController.js";

const userRouter = express();

userRouter.post("/register", verifyRegister, register);
userRouter.post("/logIn", verifyLogIn, logIn);
userRouter.get("/verifyEmail", verifyEmail);
userRouter.get("/checkingToken", verifyJwt, checkingToken);
userRouter.get("/getUser", verifyJwt, getUser);
userRouter.get("/authorInfo", authorInfo);

export default userRouter