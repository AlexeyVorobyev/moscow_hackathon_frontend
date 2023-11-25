import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {ITaskEntity} from '../../../redux/api/types/task'

export const TasksTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'ID',
        format: (value:ITaskEntity) => value.id.toString()
        // display: false
    },
]

