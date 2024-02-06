import { NextFunction, Request, Response, Router } from "express";
import { OAuth2Client } from 'google-auth-library';
import * as dotenv from "dotenv";

dotenv.config();
export const authRouter = Router();

async function getUserData(access_token: string) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    return data;
}

authRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {

    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid"
        ],
        prompt: 'consent'
    });

    res.json({ url: authorizeUrl });
})

authRouter.get('/', async (req: Request, res: any, next: NextFunction) => {

    const code: string = req.query.code as string;

    try {
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL
        );

        const response = await oAuth2Client.getToken(code);

        oAuth2Client.setCredentials(response.tokens);

        const accessToken = oAuth2Client.credentials.access_token;

        const userData = await getUserData(accessToken);

        const encodedData = encodeURIComponent(JSON.stringify(userData));
        const encodedAccessToken = encodeURIComponent(JSON.stringify(accessToken));

        const redirectUrl = `${process.env.Front_END_URL}?userData=${encodedData}&accessToken=${encodedAccessToken}`;
        res.redirect(redirectUrl);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})