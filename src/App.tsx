import React from "react";
import {SkeletonWrapper} from "./components/skeleton/SkeletonWrapper";
import {RouterComponent} from "./components/Router/RouterComponent";
import {useLoginStatus} from "./components/functions/useLoginStatus";
import {routesList} from "./components/Router/routesList";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store/store";
import {AuthPage} from "./components/pages/AuthPage/AuthPage";
import {routesAuthList} from "./components/Router/routesAuthList";

const App: React.FC = () => {

    useLoginStatus()

    const user = useSelector((state: RootState) => state.user)

    console.log(user.isAuth)

    return (
        <>
            {user.isAuth ?
                <SkeletonWrapper>
                    <RouterComponent routesList={routesList}/>
                </SkeletonWrapper>
                : <RouterComponent routesList={routesAuthList}/>
            }
        </>
    )
}

export default App
