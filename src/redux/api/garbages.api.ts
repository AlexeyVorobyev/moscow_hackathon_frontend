import {api, constructQueryString} from './api'
import {IGarbagePostPutPayload, IGarbagesPayload} from "./types/garbages";

export const garbagesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        garbages: builder.query<any, IGarbagesPayload>({
            query: (settings) => ({
                url: '/garbage' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['garbages']
        }),
        garbage: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/garbage/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['garbages']
        }),
        garbageDelete: builder.mutation<any, { id: string }>({
            query: (settings) => ({
                url: `/garbage/${settings.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['garbages']
        }),
        garbagePost: builder.mutation<any, { body: IGarbagePostPutPayload }>({
            query: (settings) => ({
                url: `/garbage`,
                method: 'POST',
                body: settings.body
            }),
            invalidatesTags: ['garbages']
        }),
        garbagePut: builder.mutation<any, { id: string, body: IGarbagePostPutPayload }>({
            query: (settings) => ({
                url: `/garbage/${settings.id}`,
                method: 'PUT',
                body: settings.body
            }),
            invalidatesTags: ['garbages']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyGarbagesQuery,
    useGarbageDeleteMutation,
    useGarbageQuery,
    useLazyGarbageQuery,
    useGarbagePostMutation,
    useGarbagePutMutation
} = garbagesApi