import {ReactNode} from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
import {EPageType} from "../../pages/СustomizationPage/СustomizationPage";

export interface ISideNavigationConfig {
    path: string | null,
    name: string
    icon?: ReactNode
    routes?: ISideNavigationConfig[]
}


export const sideNavigationConfig: ISideNavigationConfig[] = [
    {path: '/mainMap', name: 'Карта', icon: <QueryStatsIcon/>},

    {path: '/statistics', name: 'Статистика', icon: <QueryStatsIcon/>},

    {
        path: null, name: 'Реестр', icon: <SettingsIcon/>,
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