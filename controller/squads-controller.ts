import { NextFunction, Request, Response, Router } from "express";
import { addUserToSquad, createNewSquad, getAllSquads } from "../logic/squads-logic";
import { getUserById } from "../logic/users-logic";

export const squadsRouter = Router();

squadsRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {

    const allSquads = await getAllSquads();

    return res.json(allSquads);
})

squadsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.name) {
        return res.status(400).json({
            error: "missing name",
            message: "Name is missing."
        });
    }

    try {
        const resoult = await createNewSquad(req.body);
        return res.status(200).json(resoult);
    } catch (error) {
        console.error(error);
    }
})

squadsRouter.patch('/adduser', async (req: Request, res: Response, next: NextFunction) => {

    const userData = await getUserById(req.body.userId);

    if (!userData) {
        return res.status(404).json({
            error: "user not found",
            message: "Couldn't find a user with that ID."
        });
    }

    try {
        const resoult = await addUserToSquad(req.body);
        return res.status(200).json(resoult);
    } catch (error) {
        console.error(error);
    }
})