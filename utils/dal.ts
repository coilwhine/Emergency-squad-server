import mongoose from "mongoose";

export function connectToDb() {
    mongoose.connect("mongodb://localhost:27017/emergency-squad");
}
