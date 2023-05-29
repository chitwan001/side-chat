import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.routes';
import mongoose from 'mongoose';
import { Server } from "socket.io";
import http from 'http';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;


app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});
const server = http.createServer(app);
const io = new Server(server);
mongoose.connect(process.env.MONGO_URI || "").then(() => {
    server.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
})