import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./config/db.js";
const app = express();
import cookieParser from "cookie-parser";

// route import
import authRoute from "./routes/auth.route.js";
import teacherRoute from "./routes/teacher.route.js";

// Define a port number
const PORT = process.env.PORT || 3000;

app.use(cookieParser()); // Add this line to use cookie-parser

// Middleware to parse JSON bodies
app.use(express.json());

dbConnection();
// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoute);
app.use("/api", teacherRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
