import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log("Received login attempt:", { username, password });
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.status(200).json({ authenticated: true });
  } else {
    console.log("Authentication failed");
    res.status(401).json({ authenticated: false });
  }
});

export default router;
