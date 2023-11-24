import {ReactNode} from "react";
import {CustomizationPage, EPageType} from "../pages/СustomizationPage/СustomizationPage";
import {Navigate} from "react-router-dom";
import {PageWrapper} from "../skeleton/PageWrapper";
import {StatisticsPage} from "../pages/StatisticsPage/StatisticsPage";
import {MapPage} from "../pages/MapPage/MapPage";
import {AuthPage} from "../pages/AuthPage/AuthPage";

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

export const routesAuthList: IRoute[] = [
    {
        path: '/',
        name: 'Базовая страница',
        component: <AuthPage/>
    },

    {
        path: '*',
        name: 'Пересылка',
        component: <Navigate to={'/'}/>
    },
]