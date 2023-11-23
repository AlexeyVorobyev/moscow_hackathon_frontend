import {CONFIG} from "../../../config";
import {Circle, FeatureGroup, LayersControl, Pane, TileLayer} from "react-leaflet";
import {mapBackground} from "./MapBackground";
import React, {FC} from "react";
import {CLUSTERS_NAME, GRAYSCALE_NAME} from "./MapRender";
import {TServerSideOptions} from "../../functions/usePageState";

interface IProps {
    serverSideOptions: TServerSideOptions
}

export const MapTilesPane: FC<IProps> = ({
                                             serverSideOptions
                                         }) => {

    return (
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
    )
}