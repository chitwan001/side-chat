import express from 'express'
import { login, me, register } from '../controllers/auth.controller';
import { authorize } from '../middlewares/authorize';

const authRouter = express.Router();

authRouter
    .post('/login', login)
    .post('/register', register)
    .get('/me', authorize, me)

export default authRouter;