import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db.js";

config();
await connectDB();
import taskRouter from "./Tasks/router.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/tasks", express.json({ limit: "1mb" }), express.raw({ type: 'application/json' }), taskRouter); //define api-routes
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
