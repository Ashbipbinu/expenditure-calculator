import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  userSignUp  from "./Routers/auth.route.js";
const app = express();
dotenv.config();

app.use(express.json())
app.use("/api/auth", userSignUp);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server listening to port 3000");
    });
  })
  .catch((err) => {
    console.log("Failed to connect with database", err);
  });
