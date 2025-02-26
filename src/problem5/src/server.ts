import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import resourceRoutes from "./routes/resourceRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

