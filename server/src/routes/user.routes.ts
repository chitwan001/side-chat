import express from 'express'
import { createNewChat, getDetails, getDetailsById } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter
    .post('/getDetails', getDetails)
    .post('/getDetailsById', getDetailsById)
    .post('/createNewChat', createNewChat)

export default userRouter;