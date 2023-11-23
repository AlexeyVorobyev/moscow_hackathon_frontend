import React, {useEffect} from 'react'
import {useMap} from 'react-leaflet'
import {CONFIG} from "../../../config";
import {TServerSideOptions} from "../../functions/usePageState";


interface IProps {
    serverSideOptions:TServerSideOptions
}

export const MapGray: React.FC<IProps> = ({
                                              serverSideOptions
                                          }) => {
    const map = useMap()
    useEffect(() => {
        const pane = map.getPane('tilesPane')
        if (pane) {
            pane.style.filter = serverSideOptions.get('grayscale')
                ? `grayscale(${CONFIG.mapGrayscale})`
                : `grayscale(0%)`
        }
    }, [serverSideOptions])
    return null
}
