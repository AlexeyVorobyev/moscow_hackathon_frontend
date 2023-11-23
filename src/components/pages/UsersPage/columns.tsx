import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";

export const UsersTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'ID',
        label: 'id',
        display: false
    },
    {
        id: 'name',
        label: 'Имя',
    },
    {
        id: 'surname',
        label: 'Фамилия',
    },
    {
        id: 'patronymic',
        label: 'Отчество',
        display: false
    },
    {
        id: 'email',
        label: 'Почта',
    },
]

