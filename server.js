// ─── Cách tích hợp vào app.js / server.js ───────────────────────────────────
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const staffRoutes = require("./routes/staffRoutes")
const quyenSuDungRoutes = require("./routes/quyenSuDungRoutes");


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // BẮT BUỘC để đọc cookie refreshToken
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // BẮT BUỘC để gửi/nhận cookie cross-origin
  })
);

// Routes
app.use("/api/staff", staffRoutes);
app.use("/api/quyen-su-dung", quyenSuDungRoutes);


// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);
