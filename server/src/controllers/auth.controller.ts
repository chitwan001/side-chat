import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import httpStatus from "http-status";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send({
                code: httpStatus.NOT_FOUND,
                success: false,
                data: null,
                error: {
                    statusCode: httpStatus.NOT_FOUND,
                    message: `User not found with email address ${email}`,
                },
            });
        }

        // compare password with stored hash
        bcrypt.compare(password, user.hash, (err, result) => {
            if (err) {
                console.error(err);
                return res.send({
                    code: httpStatus.FORBIDDEN,
                    success: false,
                    data: null,
                    error: {
                        statusCode: httpStatus.FORBIDDEN,
                        message: err,
                    },
                });
            }

            // password doesnt matches with hash
            if (result == false) {
                return res.send({
                    code: httpStatus.UNAUTHORIZED,
                    success: false,
                    data: null,
                    error: {
                        statusCode: httpStatus.UNAUTHORIZED,
                        message: "Password doesnt match.",
                    },
                });
            }

            // if the password matches, create a jsonwebtoken
            else {
                const token = jwt.sign({
                    id: user._id,
                },
                    process.env.JWT_SECRET_KEY || ""
                )

                return res.status(httpStatus.OK).send({
                    code: httpStatus.OK,
                    success: true,
                    data: {
                        body: {
                            token
                        },
                        statusCode: httpStatus.OK,
                        message: "Logged in successfully"
                    },
                    error: null
                })
            }
        })
    } catch (error) {
        console.error(error);
        return res.send({
            code: 0,
            success: false,
            data: null,
            error: {
                statusCode: undefined,
                message: error
            }
        })

    }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, seed, stripe, backgroundColor } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
        firstName,
        lastName,
        email,
        hash,
        seed,
        stripe,
        backgroundColor
    })

    await user.save()

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET_KEY || ""
    )

    return res.status(httpStatus.CREATED).send({
        status: 1,
        success: {
            data: {
                token
            }
        },
        error: {}
    })

};

const me = async (req: Request, res: Response, next: NextFunction) => {
    const bearer: string = req.headers['authorization']!
    const token = bearer.split(" ")[1];
    const decoded = jwt.decode(token);
    if (decoded) {
        const d = decoded as JwtPayload
        const user = await User.findById(d.id);
        if (user) {
            user.hash = ''
            return res.status(httpStatus.OK).send({
                code: httpStatus.OK,
                success: true,
                data: {
                    body: user
                },
                error: null
            })
        }
    }
}

export { login, register, me }