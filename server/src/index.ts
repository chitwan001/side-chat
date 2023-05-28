import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.routes';
import mongoose from 'mongoose';
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;


app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});


mongoose.connect(process.env.MONGO_URI || "").then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
})