import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();

// Middlewares
app.use(express.json());

// Database connection + Start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`✅ Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("❌ Mongodb connection failed!!", err);
  });

// A test route (optional, to check if server is working)
// app.get("/", (req, res) => {
//   res.send("🚀 Server is up and running!");
// });
