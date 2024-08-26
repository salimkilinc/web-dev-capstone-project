import express from "express";
import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/messages", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const { fname, lname, email, subject, message } = req.body;
  const newUuid = uuidv4();
  try {
    await pool.query(
      "INSERT INTO contact_messages (first_name, last_name, email, subject, message, uuid) VALUES ($1, $2, $3, $4, $5, $6)",
      [fname, lname, email, subject, message, newUuid]
    );
    res.status(201).send({ message: "Message received" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).send("Server error");
  }
});

router.post("/markAsRead", async (req, res) => {
  const { uuid } = req.body;
  try {
    const result = await pool.query(
      "UPDATE contact_messages SET read = TRUE WHERE uuid = $1",
      [uuid]
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Message marked as read" });
    } else {
      res.status(404).send({ error: "No matching message found" });
    }
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).send("Server error");
  }
});

router.delete("/delete", async (req, res) => {
  const { uuid } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM contact_messages WHERE uuid = $1",
      [uuid]
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Message deleted successfully" });
    } else {
      res.status(404).send({ error: "No matching message found" });
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Server error");
  }
});

export default router;
