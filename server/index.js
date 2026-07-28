import "dotenv/config";
import express from "express";
import connectDb from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./src/routes/user.routes.js";
import messageRouter from "./src/routes/message.routes.js";
import { app, server } from "./src/socket/socket.js";

const port = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://sparkling-heliotrope-b4a025.netlify.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use("/api/auth", express.json(), authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port http://localhost:${PORT}`);
});