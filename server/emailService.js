import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.YAHOO_EMAIL,
    pass: process.env.YAHOO_PASSWORD,
  },
});

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.YAHOO_EMAIL,
    to,
    subject,
    text,
  };

  console.log("Sending email with options:", mailOptions);

  return transporter.sendMail(mailOptions);
};
