import { ActiveChat } from "./Objects";

export interface userInterface {
    email: string,
    firstName: string,
    lastName: string,
    seed: string,
    stripe: string,
    backgroundColor: string,
    role: string,
    _id: string,
    preferredLanguage: string
    activeChats: ActiveChat[]
}
export type userType = userInterface | null;