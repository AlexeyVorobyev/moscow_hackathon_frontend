import React, {FC, ReactNode, useCallback, useEffect, useMemo, useReducer, useState} from 'react'
import {IUseServerSideOptions} from '../../functions/usePageState'
import {MapContainer, ScaleControl, ZoomControl} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {MapBounds} from './MapBounds'
import {MapEventsListener} from './MapEventsListener'
import {MapGray} from './MapGrey'
import {MapTilesPane} from './MapTilesPane'
import {MapSearch} from './MapSearch'
import {MapFilter} from './MapFilter'
import {IMapMarkerData, MapCameraMarker} from './MapCameraMarker'
import MarkerClusterGroup from 'react-leaflet-cluster'
import {CONFIG} from '../../../config'
import {ICameraEntity} from '../../../redux/api/types/cameras'

interface IProps extends IUseServerSideOptions {
    dataCameras: ICameraEntity[]
}

export const GRAYSCALE_NAME: string = 'Затенение'
export const CLUSTERS_NAME: string = 'Кластеризация'

export const MapRender: FC<IProps> = ({
                                          serverSideOptions,
                                          setServerSideOptions,
                                          dataCameras
                                      }) => {
    const [collapsedFilters, setCollapsedFilters] = useState<boolean>(true)
    const [closeAll, triggerCloseAll] = useReducer(x => x + 1, 0)
    const [popupElement, setPopupElement] = useState<ReactNode | null>(null)
    const dataCamerasFormat = useCallback(() => {
        const _dataCamerasProcessed = dataCameras.map((data) => {
            return {
                id: data.id,
                coordinates: data.coordinates,
                name: data.name,
                address: data.address,
                violationsAmount: data.violationsAmount
            } as IMapMarkerData
        })

        const oldMarkersIds = dataCamerasProcessed.map((marker) => marker.id)
        const newMarkersIds = _dataCamerasProcessed.map((marker) => marker.id)

        const oldMemoizedMarkers = dataCamerasProcessed
            .filter((marker) => newMarkersIds.includes(marker.id))
        const oldMemoizedMarkersIds = oldMemoizedMarkers.map((marker) => marker.id)
        const newMarkers = _dataCamerasProcessed
            .filter((marker) => !oldMarkersIds.includes(marker.id))
            .filter((marker) => !oldMemoizedMarkersIds.includes(marker.id))

        return [
            ...oldMemoizedMarkers,
            ...newMarkers,
        ]
    }, [dataCameras])

    const [dataCamerasProcessed, setDataCamerasProcessed] = useState<IMapMarkerData[]>([])

    useEffect(() => {
        const _dataCamerasProcessed = dataCamerasFormat()
        setDataCamerasProcessed(_dataCamerasProcessed)
    }, [dataCameras])

    const renderCameras = useMemo(() => {
        return (<>
            {dataCamerasProcessed.map((data) => (
                <MapCameraMarker markerData={data} closeAll={closeAll} triggerCloseAll={triggerCloseAll}
                                 setServerSideOptions={setServerSideOptions}
                                 setPopupElement={setPopupElement} serverSideOptions={serverSideOptions} key={data.id}/>
            ))}
        </>)
    }, [dataCamerasProcessed, closeAll])

    return (<>
        <MapContainer
            maxZoom={CONFIG.mapMaxZoom}
            minZoom={CONFIG.mapMinZoom}
            zoom={serverSideOptions.get('zoom')}
            center={serverSideOptions.get('coords')}
            zoomControl={false}
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            {serverSideOptions.get('clusters') && serverSideOptions.get('cameras')
                ? (
                    <MarkerClusterGroup>
                        {renderCameras}
                    </MarkerClusterGroup>
                ) : serverSideOptions.get('cameras') && renderCameras}


            <MapSearch
                serverSideOptions={serverSideOptions}
                setServerSideOptions={setServerSideOptions}
                collapsedFilters={collapsedFilters}
                setCollapsedFilters={setCollapsedFilters}/>

            <MapFilter collapsedFilters={collapsedFilters}
                       serverSideOptions={serverSideOptions}
                       setServerSideOptions={setServerSideOptions} popupElement={popupElement}/>

            <MapBounds
                serverSideOptions={serverSideOptions}
                setServerSideOptions={setServerSideOptions}/>

            <MapEventsListener
                serverSideOptions={serverSideOptions}
                setServerSideOptions={setServerSideOptions}/>

            <MapGray serverSideOptions={serverSideOptions}/>

            <ScaleControl/>

            <ZoomControl position="topleft"/>

            <MapTilesPane serverSideOptions={serverSideOptions}/>
        </MapContainer>
    </>)
}