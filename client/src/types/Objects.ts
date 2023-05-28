import { userType } from ".";

export type SignupObject = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    seed: string;
    stripe: string;
    backgroundColor: string;
};

export type ActiveChat = {
    chats: Chat[],
    users: userType[]
}

export type Chat = {
    body: string;
    from: userType;
    to: userType;
    type: string;
    status: string,
    sentTime: Date,
    _id: string;
};

export type ModifiedSignupObject = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    seed?: string;
    stripe?: string;
    backgroundColor?: string;
}