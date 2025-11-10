import { UserModel } from "../models/user.js";

export class UserManager {
    static async createUser(userData) {
        try {
            const newUser = new UserModel(userData);
            return await newUser.save();
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
    static async getUser(filter = {}) {
        try {
            return await UserModel.find(filter).lean();
        } catch (error) {
            throw new Error(`Error retrieving user: ${error.message}`);
        }
    }
    static async updateUser(userId, updateData) {
        try {
            return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }
    static async deleteUser(userId) {
        try {
            return await UserModel.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}
