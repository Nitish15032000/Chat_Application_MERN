import express from "express";
import connectDB from "./src/config/database.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());


app.get("/", (req, res) => {
   res.send("API is Working!");
});






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server is running on port http://localhost:${PORT}`);
});