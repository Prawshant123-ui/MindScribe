require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { apiLimiter } = require("./middlewares/rateLimiter");
const authRoutes = require("./routes/authRoute");
const noteRoutes = require("./routes/noteRoute");
const seedAdmin = require("./config/seedAdmin");

const app = express();



app.use(cors({
  origin: "https://mind-scribe-pi.vercel.app",
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


app.use((err, req, res, next) => {
  console.error("Global error full:", err); 
  console.error("Global error name:", err?.name);
  console.error("Global error code:", err?.code);
  console.error("Global error stack:", err?.stack);
  
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File too large. Max size is 500MB." });
  }
  return res.status(500).json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 2000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("DB connected");
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
};

startServer();
