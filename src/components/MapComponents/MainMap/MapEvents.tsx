import React, {FC} from 'react'
import L from 'leaflet'
import {useMapEvents} from 'react-leaflet'

interface IProps {
    handlers: L.LeafletEventHandlerFnMap
}

export const MapEvents: FC<IProps> = ({
                                          handlers
                                      }) => {
    const map = useMapEvents(handlers)
    return null
}

