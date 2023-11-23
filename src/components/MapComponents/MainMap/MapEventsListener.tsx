import React, {FC, useCallback} from "react";
import {MapEvents} from "./MapEvents";
import {IUseServerSideOptions} from "../../functions/usePageState";
import {LayersControlEvent} from "leaflet";
import {CLUSTERS_NAME, GRAYSCALE_NAME} from "./MapRender";

interface IProps extends IUseServerSideOptions {
}

export const MapEventsListener: FC<IProps> = ({
                                                  serverSideOptions,
                                                  setServerSideOptions
                                              }) => {
    const baseLayerChangeHandler = useCallback((event: LayersControlEvent) => {
        setServerSideOptions((prev) => {
            prev.set('baseLayer', event.name)
            return new Map(prev)
        })
    }, [])

    const overlayAddHandler = useCallback((event: LayersControlEvent) => {
        if (event.name === GRAYSCALE_NAME) {
            setServerSideOptions((prev) => {
                prev.set('grayscale', true)
                return new Map(prev)
            })
        }
        if (event.name === CLUSTERS_NAME) {
            setServerSideOptions((prev) => {
                prev.set('clusters', true)
                return new Map(prev)
            })
        }
    }, [])

    const overlayRemoveHandler = useCallback((event: LayersControlEvent) => {
        if (event.name === GRAYSCALE_NAME) {
            setServerSideOptions((prev) => {
                prev.set('grayscale', false)
                return new Map(prev)
            })
        }
        if (event.name === CLUSTERS_NAME) {
            setServerSideOptions((prev) => {
                prev.set('clusters', false)
                return new Map(prev)
            })
        }
    }, [])


    return <MapEvents handlers={{
        baselayerchange: baseLayerChangeHandler,
        overlayadd: overlayAddHandler,
        overlayremove: overlayRemoveHandler
    }}/>
}