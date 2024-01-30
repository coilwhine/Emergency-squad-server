import mongoose from "mongoose";

export type SquadModel = {
    sub: mongoose.Schema.Types.ObjectId,
    name: string,
}

const squadSchema = new mongoose.Schema<SquadModel>({
    name: {
        type: String,
        required: true,
        minlength: [2, "name is too short"]
    }
})

export const squadModel = mongoose.model<SquadModel>("squads", squadSchema)