import { Request, Response } from "express";
import UserService from "./user.service";
import bcrypt from "bcrypt";

const userService = new UserService();

export default class UserController {

    /**
     * Get all users
     */
    async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    /**
     * Get single user by ID
     */
    async getUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await userService.getUser(id);
            return res.json(user);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    /**
     * Create user
     */
    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const hash = await bcrypt.hash(password, 10);
            const user = await userService.createUser({ name, email, password: hash });

            return res.status(201).json({
                message: "User created successfully",
                user
            });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    /**
     * Update user
     */
    async updateUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;

            const user = await userService.updateUser(id, data);
            return res.json({
                message: "User updated successfully",
                user
            });

        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    /**
     * Delete user
     */
    async deleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id;

            await userService.deleteUser(id);
            return res.json({ message: "User deleted successfully" });

        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;

        const token: any = await userService.login({ email, password });

        return res.json({ message: "Logged in", token });
    };
}
