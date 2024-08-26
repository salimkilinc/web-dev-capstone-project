import express from "express";
import bodyParser from "body-parser";
import contactRoutes from "./routes/contact.js";
import authenticateRoutes from "./routes/authenticate.js";
import emailRoutes from "./routes/email.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  const allowedOrigins = ["https://salimkilinc.com", "http://localhost:5173"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());

app.use("/api/contact", contactRoutes);
app.use("/api/authenticate", authenticateRoutes);
app.use("/api/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello, the server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
