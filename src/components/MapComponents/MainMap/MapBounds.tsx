import React, {FC, useCallback, useEffect} from 'react'
import {useMap, useMapEvents} from 'react-leaflet'
import {TServerSideOptions} from "../../functions/usePageState";
import {CONFIG} from "../../../config";
import {useDebounce} from "../../functions/useDebounce";
import {MapEvents} from "./MapEvents";

interface IProps {
    serverSideOptions: TServerSideOptions
    setServerSideOptions: React.Dispatch<React.SetStateAction<TServerSideOptions>>
}

export const MapBounds: FC<IProps> = ({
                                          serverSideOptions,
                                          setServerSideOptions
                                      }) => {
    const map = useMap()
    const setBoundsDebounced = useDebounce(setServerSideOptions, CONFIG.mapBoundsDebounce)

    useEffect(() => {
        if (!serverSideOptions.get('bounds')) {
            onMove()
        }
    }, [])

    const onMove = useCallback(() => {
        const bounds = map.getBounds()
        const zoom = map.getZoom()
        const coords = map.getCenter()
        const northEast = bounds.getNorthEast()
        const southWest = bounds.getSouthWest()
        setBoundsDebounced((prev:TServerSideOptions) => {
            prev.set('bounds', {
                northEast: {
                    lat: northEast.lat >= 0 ? northEast.lat * 1.01 : northEast.lat * 0.99,
                    lon: northEast.lng >= 0 ? northEast.lng * 1.01 : northEast.lng * 0.99,
                },
                southWest: {
                    lat: southWest.lat < 0 ? southWest.lat * 1.01 : southWest.lat * 0.99,
                    lon: southWest.lng < 0 ? southWest.lng * 1.01 : southWest.lng * 0.99,
                }
            })
            prev.set('zoom', zoom)
            prev.set('coords', coords)
            return new Map(prev)
        })
    }, [])

    return <MapEvents handlers={{
        moveend: onMove
    }}/>
}