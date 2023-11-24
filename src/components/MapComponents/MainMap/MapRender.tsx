import React, {FC, useState} from "react";
import {IUseServerSideOptions} from "../../functions/usePageState";
import {MapContainer, ScaleControl, ZoomControl} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {MapBounds} from "./MapBounds";
import {MapEventsListener} from "./MapEventsListener";
import {MapGray} from "./MapGrey";
import {MapTilesPane} from "./MapTilesPane";
import {MapSearch} from "./MapSearch";
import {MapFilter} from "./MapFilter";

interface IProps extends IUseServerSideOptions {
}

export const GRAYSCALE_NAME: string = 'Затенение'
export const CLUSTERS_NAME: string = 'Кластеризация'

export const MapRender: FC<IProps> = ({
                                          serverSideOptions,
                                          setServerSideOptions,
                                      }) => {
    const [collapsedFilters, setCollapsedFilters] = useState<boolean>(true)

    return (<>
        <MapContainer
            zoom={serverSideOptions.get('zoom')}
            center={serverSideOptions.get('coords')}
            zoomControl={false}
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <MapSearch
                serverSideOptions={serverSideOptions}
                setServerSideOptions={setServerSideOptions}
                collapsedFilters={collapsedFilters}
                setCollapsedFilters={setCollapsedFilters}/>

            <MapFilter collapsedFilters={collapsedFilters}
                       serverSideOptions={serverSideOptions}
                       setServerSideOptions={setServerSideOptions}/>

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