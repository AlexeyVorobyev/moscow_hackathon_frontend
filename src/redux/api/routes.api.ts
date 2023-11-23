import {api, constructQueryString} from './api'
import {IRoutesPayload} from "./types/routes";

export const routesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        routes: builder.query<any, IRoutesPayload>({
            query: (settings) => ({
                url: '/route' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['routes']
        }),
        route: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/route/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['routes']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyRoutesQuery,
    useRouteQuery,
    useLazyRouteQuery,
} = routesApi