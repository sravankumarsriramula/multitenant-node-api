import { Router } from "express";
import UserController from "./user.controller";

const router = Router();
const controller = new UserController();

router.get("/", (req, res) => controller.getUsers(req, res));
router.get("/:id", (req, res) => controller.getUser(req, res));
router.post("/", (req, res) => controller.createUser(req, res));
router.put("/:id", (req, res) => controller.updateUser(req, res));
router.delete("/:id", (req, res) => controller.deleteUser(req, res));

export default router;
