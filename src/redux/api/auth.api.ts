import {api} from './api'
import {
    LoginPayload,
    LoginResponse,
} from "./types/auth";
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        auth: builder.mutation<LoginResponse,LoginPayload>({
            query: (body) => ({
                url:`/auth`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
        }),
        me: builder.mutation<any,null>({
            query: () => ({
                url:`/me`,
                method: 'POST',
                headers: {
                    'authorization':'testdatabase'
                }
            }),
        })
    }),
    overrideExisting:false
})

export const {
    useAuthMutation,
    useMeMutation
} = authApi