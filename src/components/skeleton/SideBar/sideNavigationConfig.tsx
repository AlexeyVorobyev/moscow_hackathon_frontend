import {ReactNode} from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {EPageType} from "../../pages/СustomizationPage/СustomizationPage";
import MapIcon from '@mui/icons-material/Map';
import StorageIcon from '@mui/icons-material/Storage';

export interface ISideNavigationConfig {
    path: string | null,
    name: string
    icon?: ReactNode
    routes?: ISideNavigationConfig[]
}


export const sideNavigationConfig: ISideNavigationConfig[] = [
    {path: '/mainMap', name: 'Карта', icon: <MapIcon/>},

    {path: '/statistics', name: 'Статистика', icon: <QueryStatsIcon/>},

    {
        path: null, name: 'Реестр', icon: <StorageIcon/>,
        routes: [
            {
                path: `customization/cameras/${EPageType.table}`,
                name: 'Камеры',
            },
            {
                path: `customization/routes/${EPageType.table}`,
                name: 'Маршруты',
            },
            {
                path: `customization/violations/${EPageType.table}`,
                name: 'Нарушения',
            },
            {
                path: `customization/garbages/${EPageType.table}`,
                name: 'Свалки',
            },
            {
                path: `customization/users/${EPageType.table}`,
                name: 'Пользователи',
            },
        ]
    },
]