import mongoose from "mongoose";

export function connect() {
    mongoose.connect("mongodb://localhost:27017/emergency-squad");
}
