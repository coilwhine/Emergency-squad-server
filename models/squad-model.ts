import mongoose from "mongoose";

export type SquadModel = {
    sub: mongoose.Schema.Types.ObjectId,
    name: string,
    commander: mongoose.Schema.Types.ObjectId,
    members: mongoose.Schema.Types.ObjectId[]

}

const squadSchema = new mongoose.Schema<SquadModel>({
    name: {
        type: String,
        required: true,
        minlength: [2, "name is too short"]
    },
    commander: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
})

export const squadModel = mongoose.model<SquadModel>("squads", squadSchema)