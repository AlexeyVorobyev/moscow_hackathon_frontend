import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUniversitiesPayload} from "./types/universities";
import {ICamerasPayload} from "./types/cameras";

const disabledAuthTokenEndpoints = [
    'auth',
]
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['universities', 'cameras', 'routes', 'violations', 'users','garbages'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API_HOST,
        prepareHeaders: (headers, api) => {
            if (disabledAuthTokenEndpoints.includes(api.endpoint)) {
                return headers
            }
            headers.set('Authorization', `testdatabase`)
            return headers
        }
    }),
    endpoints: () => ({})
})

type TSerializePayload = IUniversitiesPayload | ICamerasPayload

export const constructQueryString = (config: TSerializePayload): string => {
    let resString = '?'

    for (const key of Object.keys(config)) {
        resString += `${key}=${config[key as keyof TSerializePayload]}&`
    }

    console.debug('DEBUG QUERYPARAMS', resString)

    return resString === '?' ? '' : resString
}