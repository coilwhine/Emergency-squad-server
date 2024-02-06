import mongoose from "mongoose";

export type UserModel = {
    sub: mongoose.Schema.Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    image: string,
    phone: string
}

const userSchema = new mongoose.Schema<UserModel>({
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
    }
})

export const userModel = mongoose.model<UserModel>("users", userSchema)