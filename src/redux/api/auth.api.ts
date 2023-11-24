import {api} from './api'
import {ILoginPayload, ILoginResponse, IRefreshPayload, IRefreshResponse,} from './types/auth'

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        auth: builder.mutation<ILoginResponse, ILoginPayload>({
            query: (body) => ({
                url: `/auth/login`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            }),
        }),
        refresh: builder.mutation<IRefreshResponse, IRefreshPayload>({
            query: (body) => ({
                url: `/auth/refresh`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            }),
        }),
    }),
    overrideExisting: false
})

export const {
    useAuthMutation,
    useRefreshMutation
} = authApi