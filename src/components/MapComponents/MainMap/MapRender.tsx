import React, {FC} from "react";
import {TServerSideOptions} from "../../functions/usePageState";
import {
    Circle,
    FeatureGroup,
    LayersControl,
    MapContainer,
    Pane,
    ScaleControl,
    TileLayer,
    ZoomControl
} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {MapBounds} from "./MapBounds";
import {mapBackground} from "./MapBackground";
import {MapEventsListener} from "./MapEventsListener";
import {MapGray} from "./MapGrey";
import {CONFIG} from "../../../config";

interface IProps {
    serverSideOptions: TServerSideOptions
    setServerSideOptions: React.Dispatch<React.SetStateAction<TServerSideOptions>>
}

export const GRAYSCALE_NAME: string = 'Затенение'
export const CLUSTERS_NAME: string = 'Кластеризация'

export const MapRender: FC<IProps> = ({
                                          serverSideOptions,
                                          setServerSideOptions,
                                      }) => {

    console.log(serverSideOptions)

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
            <MapBounds
                serverSideOptions={serverSideOptions}
                setServerSideOptions={setServerSideOptions}/>

            <MapEventsListener
                serverSideOptions={serverSideOptions}
                setServerSideOptions={setServerSideOptions}/>

            <MapGray serverSideOptions={serverSideOptions}/>

            <ScaleControl/>

            <ZoomControl position="topleft"/>

            <Pane name="tilesPane"
                  style={{filter: serverSideOptions.get('grayscale') ? `grayscale(${CONFIG.mapGrayscale})` : `grayscale(0%)`}}>
                <LayersControl position="topleft" collapsed={true}>
                    {mapBackground.map((mapTile, idx) => (
                        <LayersControl.BaseLayer key={mapTile.name} name={mapTile.name}
                                                 checked={serverSideOptions.get('baseLayer') ? mapTile.name === serverSideOptions.get('baseLayer') : idx === 0}>
                            <TileLayer url={mapTile.url} attribution={mapTile.attribution}/>
                        </LayersControl.BaseLayer>
                    ))}
                    <LayersControl.Overlay name={GRAYSCALE_NAME}
                                           checked={serverSideOptions.get('grayscale')}>
                        <FeatureGroup pathOptions={{opacity: 0}}>
                            <Circle center={serverSideOptions.get('coords')} radius={0}
                                    interactive={false}/>
                        </FeatureGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name={CLUSTERS_NAME}
                                           checked={serverSideOptions.get('clusters')}>
                        <FeatureGroup pathOptions={{opacity: 0}}>
                            <Circle center={serverSideOptions.get('coords')} radius={0}
                                    interactive={false}/>
                        </FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </Pane>
        </MapContainer>
    </>)
}