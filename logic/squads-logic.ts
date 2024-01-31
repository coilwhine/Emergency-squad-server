import { squadModel } from "../models/squad-model";

export async function getAllSquads() {

    try {
        const squads = await squadModel.find();
        return squads;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export async function addNewSquad(inputdate: { name: string }) {

    try {
        await squadModel.create({
            name: inputdate.name
        });
    } catch (error) {
        console.error(`Error creating new squad: ${error.message}`);
    }
}

