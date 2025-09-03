import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from "../helpers/helpersFunction.js";

const verifyRegister = async (req, res, next) => {
  try {
    const { username, password, telephone } = req.body;

    if (password.trim().length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    if (!username || typeof username !== "string" || username.trim() === "") {
      return res.status(400).json({ message: "Username is not valid" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, status: 1 });

    if (user && bcrypt.compareSync(password, user.password)) {
      req.body.user = user;
      next();
    }

    return res
      .status(404)
      .json({ message: "The email or password is incorrect" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyJwt = async (req, res, next) => {
  try {
    !req.body ? (req.body = {}) : "";
    const token = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    createToken(res, token);
    req.body.token = token;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export { verifyRegister, verifyLogIn, verifyJwt };
