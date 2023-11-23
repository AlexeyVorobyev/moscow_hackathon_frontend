import {api, constructQueryString} from './api'
import {IUsersPayload} from "./types/users";

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query<any, IUsersPayload>({
            query: (settings) => ({
                url: '/user' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['users']
        }),
        user: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/user/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['users']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyUsersQuery,
    useUserQuery,
    useLazyUserQuery,
} = usersApi