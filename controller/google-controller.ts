import { NextFunction, Request, Response, Router } from "express";
import { OAuth2Client } from 'google-auth-library';
import * as dotenv from "dotenv";

dotenv.config();
export const authRouter = Router();

async function getUserData(access_token: string) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log("data", data);
}

authRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {

    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    const redirectUrl = "http://127.0.0.1:3001/oauth";

    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid"
        ],
        prompt: 'consent'
    })

    res.json({ url: authorizeUrl });
})

authRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const code: string = req.query.code as string;

        const redirectUrl = "http://127.0.0.1:3001/oauth";

        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        );

        const response = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(response.tokens);
        const user = oAuth2Client.credentials;
        await getUserData(user.access_token);

    } catch (error) {
        console.error(error);
    }
})