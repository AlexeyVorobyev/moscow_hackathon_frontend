export interface LoginResponse {
    response: {
        accessToken: string,
        refreshToken: string,
        expiry: number // timeStamp
    },
    messages: any[],
    code: 0 | 1 | 2 | 3
}

export interface LoginPayload {
    username: string,
    password: string
}
