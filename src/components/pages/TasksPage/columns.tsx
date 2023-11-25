import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {ITaskEntity} from '../../../redux/api/types/task'

export const TasksTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'ID',
        format: (value:ITaskEntity) => value.id.toString()
        // display: false
    },
    {
        id: 'dateCreate',
        label: 'Дата создания',
        // display: false
    },
    {
        id: 'originalName',
        label: 'Название',
    },
    {
        display:false,
        id: 'isVideo',
        label: 'Видео',
        format: (value:ITaskEntity) => value.isVideo ? 'Да' : 'Нет'
    },
    {
        id: 'taskStatus',
        label: 'Статус',
        format: (value:ITaskEntity) => value.taskStatus === 'IN_PROCESSED' ? 'В процессе' : 'Завершено'
    },
]

