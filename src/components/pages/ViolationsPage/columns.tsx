import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {IViolationEntity} from "../../../redux/api/types/violations";

export const ViolationsTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'ID',
        label: 'id',
        display: false
    },
    {
        id: 'violationType',
        label: 'Вид нарушения',
    },
    {
        id: 'violationType',
        label: 'Вид нарушения',
    },
    {
        id: 'criminal',
        label: 'Нарушитель',
    },
    {
        id: 'date',
        label: 'Дата нарушения',
    },
    {
        id: 'address',
        label: 'Адрес',
    },
]

