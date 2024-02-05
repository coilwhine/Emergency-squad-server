import { SquadModel, squadModel } from "../models/squad-model";

export async function getAllSquads() {

    try {
        const squads = await squadModel.find();
        return squads;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export async function createNewSquad(inputData: SquadModel) {

    try {
        return await squadModel.create({
            name: inputData.name,
            commander: inputData.commander,
            members: []
        });
    } catch (error) {
        console.error(`Error creating new squad: ${error.message}`);
    }
}

export async function addUserToSquad(inputData: { squadId: string, userId: string }) {

    const squadId = inputData.squadId;
    const userId = inputData.userId;

    try {
        const updatedItem = await squadModel.findByIdAndUpdate(
            squadId,
            { $push: { "members": userId } },
            { new: true }
        );

        return updatedItem;
    } catch (error) {
        console.error(`Error creating new squad: ${error.message}`);
    }
}


