import {FC, useEffect} from "react";
import {EUsePageStateMode, usePageState} from "../../functions/usePageState";
import {varsBehaviourMapMainMap} from "./varsBehaviourMapMainMap";
import {CONFIG} from "../../../config";
import {MapRender} from "./MapRender";
import {DEFAULT_VALUES_MAIN_MAP} from '../../../globalVars'

export enum EMainMapLayers {
    cameras = 'cameras',
    routes = 'routes',
    garbages = 'garbages'
}

export const MapData: FC = () => {

    const {
        serverSideOptions,
        setServerSideOptions,
        variables
    } = usePageState({
        mode: EUsePageStateMode.queryString,
        varsBehaviorMap: varsBehaviourMapMainMap,
        defaultValue: DEFAULT_VALUES_MAIN_MAP
    })

    useEffect(() => {
        variables && console.debug('VARIABLES_TO_QUERY', variables)
    }, [variables])

    return (
        <MapRender
            serverSideOptions={serverSideOptions}
            setServerSideOptions={setServerSideOptions}/>
    )
}