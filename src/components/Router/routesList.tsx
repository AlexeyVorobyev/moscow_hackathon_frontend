import {ReactNode} from 'react'
import {CustomizationPage, EPageType} from '../pages/СustomizationPage/СustomizationPage'
import {Navigate} from 'react-router-dom'
import {PageWrapper} from '../skeleton/PageWrapper'
import {StatisticsPage} from '../pages/StatisticsPage/StatisticsPage'
import {MapPage} from '../pages/MapPage/MapPage'
import {CabinetPage} from '../pages/CabinetPage/CabinetPage'

export interface IRoute {
    path: string,
    name: string
    component: ReactNode
    routes?: IRoute[]
}

const CustomizationPageWrapped = () => (
    <PageWrapper>
        <CustomizationPage/>
    </PageWrapper>
)

export const routesList: IRoute[] = [
    {
        path: '/',
        name: 'Базовая страница',
        component: <Navigate to={'/mainMap'}/>
    },

    {
        path: '/cabinet',
        name: 'Личный кабинет',
        component: (
            <PageWrapper>
                <CabinetPage/>
            </PageWrapper>
        )
    },

    {
        path: '/mainMap',
        name: 'Карта',
        component: <MapPage/>
    },

    {
        path: '/statistics',
        name: 'Статистика',
        component: (
            <PageWrapper>
                <StatisticsPage/>
            </PageWrapper>
        )
    },

    {
        path: `customization/cameras`,
        name: 'Камеры',
        component: <Navigate to={`/customization/cameras/${EPageType.table}`}/>
    },
    {
        path: `customization/cameras/${EPageType.table}`,
        name: 'Таблица камер',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/cameras/${EPageType.view}`,
        name: 'Камера',
        component: <CustomizationPageWrapped/>
    },

    {
        path: `customization/routes`,
        name: 'Маршруты',
        component: <Navigate to={`/customization/routes/${EPageType.table}`}/>
    },
    {
        path: `customization/routes/${EPageType.table}`,
        name: 'Таблица маршрутов',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/routes/${EPageType.view}`,
        name: 'Маршрут',
        component: <CustomizationPageWrapped/>
    },

    {
        path: `customization/violations`,
        name: 'Нарушения',
        component: <Navigate to={`/customization/violations/${EPageType.table}`}/>
    },
    {
        path: `customization/violations/${EPageType.table}`,
        name: 'Таблица нарушений',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/violations/${EPageType.view}`,
        name: 'Нарушение',
        component: <CustomizationPageWrapped/>
    },

    {
        path: `customization/garbages`,
        name: 'Свалки',
        component: <Navigate to={`/customization/garbages/${EPageType.table}`}/>
    },
    {
        path: `customization/garbages/${EPageType.table}`,
        name: 'Таблица свалок',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/garbages/${EPageType.view}`,
        name: 'Свалка',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/garbages/${EPageType.edit}`,
        name: 'Настройка свалки',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/garbages/${EPageType.add}`,
        name: 'Добавление свалки',
        component: <CustomizationPageWrapped/>
    },

    {
        path: `customization/users`,
        name: 'Пользователи',
        component: <Navigate to={`/customization/users/${EPageType.table}`}/>
    },
    {
        path: `customization/users/${EPageType.table}`,
        name: 'Таблица пользователей',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/users/${EPageType.view}`,
        name: 'Пользователь',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/users/${EPageType.edit}`,
        name: 'Настройка пользователя',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/users/${EPageType.add}`,
        name: 'Добавление пользователя',
        component: <CustomizationPageWrapped/>
    },

    {
        path: `customization/tasks`,
        name: 'Анализы записей',
        component: <Navigate to={`/customization/tasks/${EPageType.table}`}/>
    },
    {
        path: `customization/tasks/${EPageType.table}`,
        name: 'Таблица анализов записей',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/tasks/${EPageType.view}`,
        name: 'Просмотр анализа записи',
        component: <CustomizationPageWrapped/>
    },
    {
        path: `customization/tasks/${EPageType.add}`,
        name: 'Добавление анализа записи',
        component: <CustomizationPageWrapped/>
    },
]

const mapRoutesListPaths = (routesList: IRoute[]): string[] => {
    const resultArr: string[] = []

    routesList.map((item) => {
        resultArr.push(item.path)
        if (item.routes) {
            resultArr.push(...mapRoutesListPaths(item.routes))
        }
    })

    return resultArr
}

export const mapRoutesListNames = (routesList: IRoute[]): [string, string][] => {
    const resultArr: [string, string][] = []

    routesList.map((item) => {
        resultArr.push([item.path, item.name])
        if (item.routes) {
            resultArr.push(...mapRoutesListNames(item.routes))
        }
    })

    return resultArr
}
export const autoGeneratedAllowedLinks = mapRoutesListPaths(routesList)

const autoGeneratedRoutesListMap = mapRoutesListNames(routesList)
export const customBreadCrumbsNameMap = new Map([
    ...autoGeneratedRoutesListMap,
    ['customization', 'Реестр'],
    ['map', 'Карта'],
    ['cabinet', 'Личный кабинет'],
    ['statistics', 'Статистика'],
])