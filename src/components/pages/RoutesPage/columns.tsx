import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {IRouteEntity, parseERouteStatusToRusName} from "../../../redux/api/types/routes";

export const RoutesTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'ID',
        display: false
    },
    {
        id: 'name',
        label: 'Название',
    },
    {
        id: 'status',
        label: 'Статус',
        format: (value: IRouteEntity) => parseERouteStatusToRusName(value.status)
    },
    {
        id: 'address',
        label: 'Адрес',
    },
    {
        id: 'camerasAmount',
        label: 'Количество камер',
        format: (value: IRouteEntity) => value.id,
        display: false
    },
    {
        id: 'dateDeparture',
        label: 'Дата отправления',
    },
    {
        id: 'dateArrival',
        label: 'Дата прибытия',
    },
    {
        id: 'wasteType',
        label: 'Тип мусора',
    },
]

