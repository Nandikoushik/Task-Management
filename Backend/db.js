import mongoose from "mongoose";
import { initSchema } from "./schema.js";

export async function connectDB() {
    try {
        const connectionString = process.env.DB_CONN;
        await mongoose.connect(connectionString, { dbName: "clkclk" });
        initSchema();
        console.log("Mongoose connected successfully");
    } catch (err) {
        console.error("Mongoose connection failed:", err.message);
    }
}