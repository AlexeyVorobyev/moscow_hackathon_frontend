import {ICustomDataTableColumn} from "../../AlexDataTable/AlexDataTable";
import {serializeICoordinatesEntity} from "../../../redux/api/types/resources";
import {IGarbageEntity} from "../../../redux/api/types/garbages";

export const GarbagesTableColumns: ICustomDataTableColumn[] = [
    {
        id: 'ID',
        label: 'id',
        display: false
    },
    {
        id: 'name',
        label: 'Название',
    },
    {
        id: 'garbageType',
        label: 'Вид свалки',
    },
    {
        id: 'dateCreation',
        label: 'Дата создания',
    },
    {
        id: 'photo',
        label: 'Фото',
        display: false
    },
    {
        id: 'coordinates',
        label: 'Координаты',
        format: (value: IGarbageEntity) => serializeICoordinatesEntity(value.coordinates)
    },
]

