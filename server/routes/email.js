import express from "express";
import nodemailer from "nodemailer";
import pool from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/send", async (req, res) => {
  const { to, subject, text, uuid } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.YAHOO_EMAIL,
      pass: process.env.YAHOO_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.YAHOO_EMAIL,
      to,
      subject,
      text,
    });

    const result = await pool.query(
      "UPDATE contact_messages SET read = TRUE, replied = TRUE WHERE uuid = $1",
      [uuid]
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Email sent successfully" });
    } else {
      res.status(404).send({ error: "No matching message found" });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
