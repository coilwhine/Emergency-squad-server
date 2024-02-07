import mongoose from "mongoose";

export type UserModel = {
    sub: mongoose.Schema.Types.ObjectId,
    googleId: string,
    firstName: string,
    lastName: string,
    email: string,
    image: string,
    phone: string,
    accessToken: string
}

const userSchema = new mongoose.Schema<UserModel>({
    googleId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    phone: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    }
})

export const userModel = mongoose.model<UserModel>("users", userSchema)