import cors from "cors";
import express from "express";
import { connectToDb } from "./utils/dal";
import fileUpload from "express-fileupload"
import * as dotenv from "dotenv"
import { squadsRouter } from "./controller/squads-controller";
import { authRouter } from "./controller/google-controller";
import { usersRouter } from "./controller/users-controller";

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

server.use('/squad', squadsRouter);
server.use('/user', usersRouter);
server.use('/oauth', authRouter);

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}...`);
    connectToDb();
})