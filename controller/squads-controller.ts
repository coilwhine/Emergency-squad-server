import { NextFunction, Request, Response, Router } from "express";
import { addNewSquad, getAllSquads } from "../logic/squads-logic";

export const squadsRouter = Router();

squadsRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {

    const squadsList = getAllSquads()

    return res.json(squadsList)
})

squadsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.name) {
        return res.status(400).json({
            error: "missing name",
            message: "Name is missing"
        });
    }

    try {
        const resoult = await addNewSquad(req.body);
        return res.status(200).json(resoult);
    } catch (error) {
        console.error(error);
    }
})