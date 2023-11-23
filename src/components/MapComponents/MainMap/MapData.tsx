import {FC, useEffect} from "react";
import {EUsePageStateMode, usePageState} from "../../functions/usePageState";
import {varsBehaviourMapMainMap} from "./varsBehaviourMapMainMap";
import {CONFIG} from "../../../config";
import {MapRender} from "./MapRender";

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
        defaultValue: new Map([
            [EMainMapLayers.cameras, true],
            [EMainMapLayers.routes, false],
            [EMainMapLayers.garbages, false],
            ['coords', [CONFIG.defaultMapLat, CONFIG.defaultMapLon]],
            ['zoom', CONFIG.defaultMapZoom],
            ['baseLayer', CONFIG.mapLayersConfig[0].name],
            ['grayscale', false],
            ['clusters', true]
        ] as [string, any][])
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