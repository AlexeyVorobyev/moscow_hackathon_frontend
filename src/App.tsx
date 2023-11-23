import React from "react";
import {SkeletonWrapper} from "./components/skeleton/SkeletonWrapper";
import {RouterComponent} from "./components/Router/RouterComponent";
import {useLoginStatus} from "./components/functions/useLoginStatus";
import {routesList} from "./components/Router/routesList";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store/store";
import {AuthPage} from "./components/pages/AuthPage/AuthPage";

const App: React.FC = () => {

    useLoginStatus()

    const user = useSelector((state: RootState) => state.user)

    return (
        <>
            {/*{user.isAuth ?*/}
            {true ?
                <SkeletonWrapper>
                    <RouterComponent routesList={routesList}/>
                </SkeletonWrapper> : <AuthPage/>
            }
        </>
    )
}

export default App
