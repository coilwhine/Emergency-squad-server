import mongoose from "mongoose";

export type UserModel = {
    sub: mongoose.Schema.Types.ObjectId,
    name: string,
    photo: string
}

const userSchema = new mongoose.Schema<UserModel>({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: null
    }
})

export const userModel = mongoose.model<UserModel>("users", userSchema)