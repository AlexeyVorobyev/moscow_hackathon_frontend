import {api, constructQueryString} from './api'
import {ITaskPostPutPayload, ITasksPayload} from './types/task'
import {IGarbagePostPutPayload} from './types/garbages'

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        tasks: builder.query<any, ITasksPayload>({
            query: (settings) => ({
                url: '/task' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['task']
        }),
        task: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/task/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['task']
        }),
        tasksPost: builder.mutation<any, { body: ITaskPostPutPayload }>({
            query: (settings) => ({
                url: `/video/process`,
                method: 'POST',
                body: settings.body,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }),
            invalidatesTags: ['task']
        }),
    }),
    overrideExisting: false
})

export const {
    useLazyTasksQuery,
    useTaskQuery,
    useTasksPostMutation,
    useLazyTaskQuery,
} = tasksApi