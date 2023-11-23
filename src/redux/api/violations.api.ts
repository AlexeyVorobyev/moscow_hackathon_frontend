import {api, constructQueryString} from './api'
import {IViolationsPayload} from "./types/violations";

export const violationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        violations: builder.query<any, IViolationsPayload>({
            query: (settings) => ({
                url: '/violation' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['violations']
        }),
        violation: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/violation/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['violations']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyViolationsQuery,
    useViolationQuery,
    useLazyViolationQuery,
} = violationsApi