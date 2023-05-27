export interface userInterface {
    email: string,
    firstName: string,
    lastName: string,
    seed: string,
    stripe: string,
    backgroundColor: string,
    role: string,
    id: string,
    preferredLanguage: string
}
export type userType = userInterface | null;