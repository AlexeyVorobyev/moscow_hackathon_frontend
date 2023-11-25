export interface ILoginResponse {
    response: {
        accessToken: string,
        refreshToken: string,
        expiry: number // timeStamp
    },
    messages: any[],
    code: 0 | 1 | 2 | 3
}

export interface ILoginPayload {
    username: string,
    password: string
}

export interface IRefreshResponse {
    response: {
        accessToken: string,
        refreshToken: string,
        expiry: number // timeStamp
    },
    messages: any[],
    code: 0 | 1 | 2 | 3
}

export interface IRefreshPayload {
    refreshToken: string
}

export interface IMeEntity {
    containPassword: true,
    mail: string,
    name: string,
    surname: string,
    patronymic: string,
    uuid: string
}
