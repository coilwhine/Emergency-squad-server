import cors from "cors";
import express from "express";
import { connect } from "./utils/dal";
import fileUpload from "express-fileupload"
import * as dotenv from "dotenv"

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));



server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
    connect()
})