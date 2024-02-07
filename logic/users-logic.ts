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

export async function getUserByGoogleId(googleId: string) {

    try {
        const user = await userModel.find({ googleId });
        return user;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export async function getUserById(userId: string) {

    try {
        const user = await userModel.findById(userId);
        return user;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export async function addNewUser(inputData: UserModel) {

    const user = {
        googleId: inputData.googleId,
        firstName: stringUtils.titleCase(inputData.firstName),
        lastName: stringUtils.titleCase(inputData.lastName),
        email: inputData.email.toLowerCase(),
        phone: inputData.phone,
        image: inputData.image,
        accessToken: inputData.accessToken
    };

    try {
        return await userModel.create(user);
    } catch (error) {
        console.error(`Error creating new squad: ${error.message}`);
    };
}

export async function updateUser(inputData: UserModel) {
    const user = {
        googleId: inputData.googleId,
        firstName: stringUtils.titleCase(inputData.firstName),
        lastName: stringUtils.titleCase(inputData.lastName),
        email: inputData.email.toLowerCase(),
        phone: inputData.phone,
        image: inputData.image,
        accessToken: inputData.accessToken
    };

    try {
        return await userModel.findOneAndUpdate({ googleId: user.googleId }, user);
    } catch (error) {
        console.error(`Error creating new squad: ${error.message}`);
    };
}