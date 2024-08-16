import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./config/db.js";
const app = express();
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

// route import
import authRoute from "./routes/auth.route.js";
import teacherRoute from "./routes/teacher.route.js";
import studentRoute from "./routes/student.route.js";

// Define a port number
const PORT = process.env.PORT || 3000;

app.use(cookieParser()); // Add this line to use cookie-parser

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

dbConnection();
// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoute);
app.use("/api", teacherRoute);
app.use("/api", studentRoute);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; // Add this line to export the app instance
