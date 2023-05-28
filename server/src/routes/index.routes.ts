import express from 'express'
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import { authorize } from '../middlewares/authorize';

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', authorize, userRouter)
export default router