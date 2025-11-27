import User from "./user.model";
import bcrypt from "bcrypt";
import { signToken } from "../../utils/jwt.js";



export default class UserService {

    async getUsers() {
        return await User.find().select("-__v");
    }

    async getUser(id: string) {
        const user = await User.findById(id).select("-__v");
        if (!user) throw new Error("User not found");
        return user;
    }

    async createUser(data: any) {
        const exists = await User.findOne({ email: data.email });
        if (exists) throw new Error("Email already exists");

        const user = new User(data);
        return await user.save();
    }

    async updateUser(id: string, data: any) {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) throw new Error("User not found");
        return user;
    }

    async deleteUser(id: string) {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new Error("User not found");
        return user;
    }

    async login(data: any) {
        const { email, password } = data;

        const user: any = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Invalid credentials");

        const token = signToken({ id: user._id });
        return token;
    }
}
