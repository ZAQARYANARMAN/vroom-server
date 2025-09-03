import jwt from "jsonwebtoken";

export const createToken = (res, userInfo) => {
  try {
    delete userInfo.iat
    delete userInfo.exp

    const token = jwt.sign(userInfo, process.env.JWT_KEY, { expiresIn: "7d" })

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 7000,
    });
  } catch (error) {
    console.log(error.message, "in createToken")
  }
};