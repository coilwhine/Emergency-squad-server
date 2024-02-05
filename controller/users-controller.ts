import { NextFunction, Request, Response, Router } from "express";
import { addNewUser, getAllUsers } from "../logic/users-logic";

export const usersRouter = Router();

usersRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {

    const allSquads = await getAllUsers();

    return res.json(allSquads);
})

usersRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.firstName) {
        return res.status(400).json({
            error: "missing first name",
            message: "First name is missing"
        });
    }

    if (!req.body.lastName) {
        return res.status(400).json({
            error: "missing last name",
            message: "Last name is missing"
        });
    }

    if (!req.body.email) {
        return res.status(400).json({
            error: "missing email",
            message: "Email is missing"
        });
    }

    if (!req.body.phone) {
        return res.status(400).json({
            error: "missing phone",
            message: "Phone number is missing"
        });
    }

    try {
        const resoult = await addNewUser(req.body);
        return res.status(200).json(resoult);
    } catch (error) {
        console.error(error);
    }
})