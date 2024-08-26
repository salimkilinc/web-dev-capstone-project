import pool from "../config/db.js";

export const saveMessage = async (messageData) => {
  const { fname, lname, email, subject, message } = messageData;
  const query = `INSERT INTO contact_messages (first_name, last_name, email, subject, message, created_at) VALUES ($1, $2, $3, $4, $5, NOW())`;
  const values = [fname, lname, email, subject, message];

  try {
    await pool.query(query, values);
  } catch (error) {
    throw new Error("Error saving message to the database");
  }
};
