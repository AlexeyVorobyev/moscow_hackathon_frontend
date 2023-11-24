import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {ICameraEntity} from "../../../redux/api/types/cameras";
import {serializeICoordinatesEntity} from "../../../redux/api/types/resources";

export const CamerasTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'id',
        label: 'ID',
        display: false,
        format: (value: ICameraEntity) => Number(value.id)
    },
    {
        id: 'name',
        label: 'Название',
    },
    {
        id: 'address',
        label: 'Адрес',
    },
    {
        id: 'coordinates',
        label: 'Координаты',
        format: (value: ICameraEntity) => serializeICoordinatesEntity(value.coordinates)
    },
    {
        id: 'violationsAmount',
        label: 'Количество нарушений',
        format: (value: ICameraEntity) => value.violationsAmount.toString()
    }
]

