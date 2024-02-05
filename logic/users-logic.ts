import { UserModel, userModel } from "../models/user-model";
import stringUtils from "../utils/stringUtils";

export async function getAllUsers() {

    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export async function getUserById(userId: string) {

    try {
        const user = await userModel.findByIdAndUpdate(userId);
        return user;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export async function addNewUser(inputData: UserModel) {

    const user = {
        firstName: stringUtils.titleCase(inputData.firstName),
        lastName: stringUtils.titleCase(inputData.lastName),
        email: inputData.email.toLowerCase(),
        phone: inputData.phone
    }

    try {
        return await userModel.create(user);
    } catch (error) {
        console.error(`Error creating new squad: ${error.message}`);
    }
}

