import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = (mail, text) => {
    transporter.sendMail({
        from: "harzaqaryan777@gmail.com",
        to: mail,
        subject: "Hello Nodemailer✔️",
        text: text,
    }, (error) => {
        if (error) {
            console.log(error)
            return error;
        } else {
            console.log("mail is sent")
        }
    })
}

export default sendMail;
