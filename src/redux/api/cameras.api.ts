import {api, constructQueryString} from './api'
import {ICamerasPayload} from "./types/cameras";

export const camerasApi = api.injectEndpoints({
    endpoints: (builder) => ({
        cameras: builder.query<any, ICamerasPayload>({
            query: (settings) => ({
                url: '/camera' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['cameras']
        }),
        camera: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/camera/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['cameras']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyCamerasQuery,
    useCameraQuery,
    useLazyCameraQuery,
} = camerasApi