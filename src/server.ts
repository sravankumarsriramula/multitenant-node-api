import 'tsconfig-paths/register.js';
import "dotenv/config";
import http from "http";
import app from "@/app";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database"; // DB loader (optional)

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
    try {
        // Connect to DB before starting server
        await connectDB();
        console.log("📦 Database connected");

        const server = http.createServer(app);

        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

        // Graceful shutdown for production
        process.on("unhandledRejection", (err) => {
            console.error("❌ Unhandled Rejection:", err);
            server.close(() => process.exit(1));
        });

        process.on("uncaughtException", (err) => {
            console.error("❌ Uncaught Exception:", err);
            process.exit(1);
        });

    } catch (err) {
        console.error("❌ Server startup failed:", err);
        process.exit(1);
    }
};

startServer();
