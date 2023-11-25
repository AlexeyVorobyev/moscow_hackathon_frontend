import {ESort} from './resources'

export interface ITasksPayload {
    filter?: string
    page?: number
    size?: number
    sort?: {
        [key: string]: `${ESort}`
    }
}

export interface ITaskEntity {
    id: number
    "originalName": string,
    "path": string,
    "result": string,
    "uuid": string,
    "dateCreate": string,
    "isVideo": true,
    "taskStatus": string
}

export interface ITaskExpandedEntity extends ITaskEntity {

}

export interface ITaskPostPutPayload {
    file: File
}
