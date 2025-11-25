import { Router } from "express";
import userRoutes from "@/api/v1/routes/user.routes";

const router = Router();

router.use("/users", userRoutes);

export default router;