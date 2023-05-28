import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status"
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from "../models/user.model"

const authorize = async (req: Request, res: Response, next: NextFunction) => {
    const bearer: string = req.headers['authorization']!
    if (bearer == null) {
        return res.status(httpStatus.UNAUTHORIZED).send({
            status: 0,
            success: {},
            error: {
                httpStatusCode: httpStatus.UNAUTHORIZED,
                message: "Auth header not set"
            }
        })
    }

    const token = bearer.split(" ")[1]
    console.log('token: ', token);

    jwt.verify(token, process.env.JWT_SECRET_KEY || '', async (err, decoded) => {
        if (err) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: 0,
                success: {},
                error: {
                    httpStatusCode: httpStatus.BAD_REQUEST,
                    message: err
                }
            })
        }

        else if (decoded == null) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: 0,
                success: {},
                error: {
                    httpStatusCode: httpStatus.BAD_REQUEST,
                    message: 'Token undefined'
                }
            })
        }

        else {
            const d = decoded as JwtPayload
            const user = User.findById(d.id)
            if (!user) {
                return res.status(httpStatus.NOT_FOUND).send({
                    status: 0,
                    success: {},
                    error: {
                        httpStatusCode: httpStatus.NOT_FOUND,
                        message: 'User not found'
                    }
                })
            }

            next();
        }
    })
}

export { authorize }