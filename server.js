import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./config/db.js";
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

dbConnection();
// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
