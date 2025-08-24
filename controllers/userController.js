import sendMail from "../helpers/mailer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

const register = async (req, res) => {
    try {
        const onetimepass = Date.now() + Math.round(Math.random() * 100);
        const newUser = await User.create({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, Number(process.env.HASH_COUNT)),
            onetimepass
        })

        sendMail(req.body.email, `http://localhost:3000/verifyEmail?onetimepass=${onetimepass}`);
        return res.status(201).json({ message: "verify your email", newUser });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const logIn = (req, res) => {
    try {
        const token = jwt.sign({ email: req.body.user.email, id: req.body.user._id }, process.env.JWT_KEY, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 7000, // 7 օր,
        });

        res.status(201).json({ message: "Congratulations, you have registered." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { onetimepass } = req.query;
        const newUser = await User.findOneAndUpdate({ status: 0, onetimepass }, { status: 1, onetimepass: null });
        if (newUser) {
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_KEY, { expiresIn: "7d" });
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 7000,
            });
            return res.status(201).json({ message: "Congratulations, you have registered." });
        }

        return res.status(401).json({ message: "The request is not valid." });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const checkingToken = async (req, res) => {
    try {
        const user = await User.findById(req.body.token.id);

        return res.status(200).json({ message: "User exists.", data: user });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.token.id }).select("username email fullname phoneNum");

        const cars = await Car.find({ author: req.body.token.id });
        const resInfo = { user, cars };

        return res.status(200).json({ message: "User found", data: resInfo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const authorInfo = async (req, res) => {
    try {
        let user = await User.findById(req.query.id);

        if (user) {
            delete user.password && user.status && user.onetimepass

            const cars = await Car.find({ author: req.query.id });

            return res.status(200).json({ message: "User found", data: { user, cars } });
        } else {
            res.status(404).json({ message: "Such user does not exist" })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { register, logIn, verifyEmail, checkingToken, getUser, authorInfo }