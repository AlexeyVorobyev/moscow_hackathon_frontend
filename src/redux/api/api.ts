import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ICamerasPayload} from './types/cameras'
import {getTokens} from '../../components/functions/getAuthToken'

const disabledAuthTokenEndpoints = [
    'auth/login',
]
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['universities', 'cameras', 'routes', 'violations', 'users', 'garbages', 'tasks'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API_HOST,
        prepareHeaders: (headers, api) => {
            if (disabledAuthTokenEndpoints.includes(api.endpoint)) {
                return headers
            }
            headers.set('Authorization', `Bearer ${getTokens().accessToken}`)
            return headers
        }
    }),
    endpoints: () => ({})
})

type TSerializePayload = ICamerasPayload

export const constructQueryString = (config: TSerializePayload): string => {
    let resString = '?'

    for (const key of Object.keys(config)) {
        resString += `${key}=${config[key as keyof TSerializePayload]}&`
    }

    console.debug('DEBUG QUERYPARAMS', resString)

    return resString === '?' ? '' : resString
}