import express from 'express'
import { createNewChat, getDetails, getDetailsById, getUserByName } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter
    .post('/getDetails', getDetails)
    .post('/getDetailsById', getDetailsById)
    .post('/createNewChat', createNewChat)
    .post('/getUserByName', getUserByName)

export default userRouter;