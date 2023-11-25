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
    id: string
}

export interface ITaskExpandedEntity extends ITaskEntity {

}

export interface ITaskPostPutPayload {
    file: File
}
