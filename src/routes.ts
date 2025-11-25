import { Router } from "express";
import userRoutes from "@/api/v1/modules/users/user.routes";

const router = Router();

router.use("/users", userRoutes);

export default router;