import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import User from "../models/user.model";
import Chat from "../models/chat.model";

const getDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.find({ email });
    return res.send({
        status: 1,
        success: {
            httpStatusCode: httpStatus.ACCEPTED,
            message: user
        },
        error: {}
    })
}
const getDetailsById = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    return res.send({
        status: 1,
        success: {
            httpStatusCode: httpStatus.ACCEPTED,
            message: user
        },
        error: {}
    })
}

const createNewChat = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const newChat = new Chat({
        users: ['638353e93df7d02ecc6e9a22', '6385b6ef1ef7cb33295d989c'],
        chats: [
            {
                to: '6385b6ef1ef7cb33295d989c',
                from: '638353e93df7d02ecc6e9a22',
                body: 'Hi there! This a new chat made by Insomnia!',
                type: 'text',
                sentTime: new Date(),
                status: 'unread'
            }
        ]
    })
    await newChat.save()
    return res.send({
        success: true,
        code: httpStatus.OK
    })
}

export { getDetails, getDetailsById, createNewChat }