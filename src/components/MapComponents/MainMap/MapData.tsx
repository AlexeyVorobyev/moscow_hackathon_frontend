import {FC, useEffect, useMemo, useState} from 'react'
import {EUsePageStateMode, usePageState} from '../../functions/usePageState'
import {varsBehaviourMapMainMap} from './varsBehaviourMapMainMap'
import {MapRender} from './MapRender'
import {DEFAULT_VALUES_MAIN_MAP} from '../../../globalVars'
import {useLazyCamerasQuery} from '../../../redux/api/cameras.api'
import {ICameraEntity} from '../../../redux/api/types/cameras'

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

    const [lazyGetCameras, queryDataCameras] = useLazyCamerasQuery()

    const lazyGetCamerasPayload = useMemo(() => {
        return {
            page: 0,
            size: 100000,
            ...(variables.filter && {filter: variables.filter}),
            bounds: JSON.stringify(variables.bounds)
        }
    }, [variables.filter, variables.bounds])

    useEffect(() => {
        console.warn('here')
        if (serverSideOptions.get('cameras')) {
            lazyGetCameras(lazyGetCamerasPayload)
        }
    }, [lazyGetCamerasPayload, serverSideOptions.get('cameras')])

    const [dataCameras, setDataCameras] = useState<ICameraEntity[] | null>(null)

    useEffect(() => {
        if (queryDataCameras?.currentData?.response.response) {
            setDataCameras(queryDataCameras?.currentData?.response.response)
        }
    }, [queryDataCameras])

    return (
        <MapRender
            serverSideOptions={serverSideOptions}
            setServerSideOptions={setServerSideOptions}
            dataCameras={dataCameras || []}
        />
    )
}