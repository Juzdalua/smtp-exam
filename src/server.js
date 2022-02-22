import bodyParser from "body-parser";
import express from "express";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import 'dotenv/config';

const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res) => {
    return res.sendFile(__dirname+"/index.html");
});

app.post("/", (req, res) => {
    const {email, title} = req.body;

    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,    // gmail 계정
            pass: process.env.PASS,     // gmail 암호
        },
    }));
    
    const mailOptions = {
        from: `Contact Us <${process.env.EMAIL}>`,  // gamil 계정으로 고정
        to: process.env.EMAIL,                      //수신자 이메일
        subject: title,                             // 메일 제목
        text: `${email} sent Email`,                // 메일 내용
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error)
            console.log(error);
        else
            console.log(`Email sent: `, info.response);
    });

    console.log(email, title)
    return res.end();
});

app.listen(PORT, () => {
    console.log(`🚀 Connect PORT: ${PORT}`);
});