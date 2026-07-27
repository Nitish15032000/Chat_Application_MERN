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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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