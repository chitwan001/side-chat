export interface dataInterface<T> {
    body: T,
    message: string
    statusCode: number
}

export interface LoginBody {
    token: string
}

export interface errorInterface {
    message: string,
    statusCode: number
}

type ErrorTimeout = {
    timeOutId: NodeJS.Timeout,
    arrayIndex: number
}

export type ErrorObject<T> = ResponseType<T> & ErrorTimeout


export type ResponseType<T> = {
    success: boolean,
    code: number,
    data: dataInterface<T> | null,
    error: errorInterface | null
}