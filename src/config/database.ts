import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("❌ MONGO_URI is missing in .env file");
        }

        // Recommended Mongoose options
        await mongoose.connect(mongoURI, {
            dbName: "multitenant",
            autoIndex: true
        });

        console.log("📦 Database connected");
    } catch (error: any) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }

    // Optional: reconnect on disconnect
    mongoose.connection.on("disconnected", () => {
        console.log("⚠️ MongoDB disconnected! Attempting reconnect...");
        connectDB();
    });
};

export default connectDB;
