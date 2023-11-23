import {api, constructQueryString} from './api'
import {ITownsAutoCompletePayload} from "./types/towns";

export const townsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        townsAutoComplete: builder.query<any, ITownsAutoCompletePayload>({
            query: (settings) => ({
                url: '/town' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['towns']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyTownsAutoCompleteQuery
} = townsApi