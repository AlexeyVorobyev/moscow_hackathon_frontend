import {api, constructQueryString} from './api'
import {ITaskPostPutPayload, ITasksPayload} from './types/task'
import {IGarbagePostPutPayload} from './types/garbages'

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        tasks: builder.query<any, ITasksPayload>({
            query: (settings) => ({
                url: '/tasks' + constructQueryString(settings),
                method: 'GET',
            }),
            providesTags: ['tasks']
        }),
        task: builder.query<any, { id: string }>({
            query: (settings) => ({
                url: `/tasks/${settings.id}`,
                method: 'GET',
            }),
            providesTags: ['tasks']
        }),
        tasksPost: builder.mutation<any, { body: ITaskPostPutPayload }>({
            query: (settings) => ({
                url: `/tasks`,
                method: 'POST',
                body: settings.body
            }),
            invalidatesTags: ['tasks']
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