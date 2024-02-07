import { NextFunction, Request, Response, Router } from "express";
import { addNewUser, getAllUsers, getUserByGoogleId, getUserById, updateUser } from "../logic/users-logic";

export const usersRouter = Router();

usersRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {

    const allSquads = await getAllUsers();

    return res.json(allSquads);
})

usersRouter.get('/userid/:userid', async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userid;
    const allSquads = await getUserById(userId);

    return res.json(allSquads);
})

usersRouter.get('/googleid/:googleid', async (req: Request, res: Response, next: NextFunction) => {

    const userGoogleId = req.params.googleid;
    console.log(userGoogleId);

    const user = await getUserByGoogleId(userGoogleId);

    return res.json(user);
})

usersRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.googleId) {
        return res.status(400).json({
            error: "missing googel id",
            message: "Google id is missing"
        });
    }

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

    if (!req.body.accessToken) {
        return res.status(400).json({
            error: "missing access token",
            message: "Access token is missing"
        });
    }

    try {
        const userExist = await getUserByGoogleId(req.body.googleId);

        if (userExist[0]) {
            const resoult = await updateUser(req.body);
            return res.status(200).json(resoult);
        }

        const resoult = await addNewUser(req.body);
        return res.status(200).json(resoult);

    } catch (error) {
        console.error(error);
    }
})