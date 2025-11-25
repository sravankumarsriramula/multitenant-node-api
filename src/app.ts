import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import versioned routes
import v1Routes from "@/api/v1/routes";

// Error middleware (you can create this file)
// import errorMiddleware from "./middlewares/error.middleware";

const app: Application = express();

// Security
app.use(helmet());

// JSON + form parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors());

// Logging (only dev)
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// Health check
app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        env: process.env.NODE_ENV || "development",
    });
});

// API routes
app.use("/api/v1", v1Routes);

// Global error handler (should be last)
// app.use(errorMiddleware);

export default app;
