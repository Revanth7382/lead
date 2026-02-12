const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // your mongoose connection file
const leadRoutes = require("./routes/leadRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
