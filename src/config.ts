import {IMapBackground} from "./components/MapComponents/MainMap/MapBackground";

interface I_CONFIG {
    mapBoundsDebounce: number;
    defaultMapZoom: number
    defaultMapLon: number
    defaultMapLat: number
    mapGrayscale: number
    tablePerPage: string
    tablePerPageOptions: string[]
    mapLayersConfig: IMapBackground[]
    mapMaxZoom:number
    mapMinZoom:number
}

export const CONFIG: I_CONFIG = {
    mapBoundsDebounce: Number(import.meta.env.VITE_APP_MAP_BOUNDS_DEBOUNCE) || 800,
    defaultMapLat: Number(import.meta.env.VITE_APP_DEFAULT_MAP_LAT) || 55.75,
    defaultMapLon: Number(import.meta.env.VITE_APP_DEFAULT_MAP_LON) || 37.5,
    defaultMapZoom: Number(import.meta.env.VITE_APP_DEFAULT_MAP_ZOOM) || 8,
    mapMaxZoom: Number(import.meta.env.VITE_APP_MAX_MAP_ZOOM) || 15,
    mapMinZoom: Number(import.meta.env.VITE_APP_MIN_MAP_ZOOM) || 2,
    mapGrayscale: Number(import.meta.env.VITE_APP_MAP_GRAYSCALE) || 1,
    tablePerPage: import.meta.env.VITE_APP_TABLE_PERPAGE || '10',
    tablePerPageOptions: import.meta.env.VITE_APP_TABLE_PERPAGE_OPTIONS.split(',') || ['1', '2', '5', '10', '20', '40', '60', '100', '200', '1000'],
    mapLayersConfig: [
        {
            name: import.meta.env.VITE_APP_MAP1_NAME || 'OSM',
            url: import.meta.env.VITE_APP_MAP1_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: import.meta.env.VITE_APP_MAP1_ATTR || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
        {
            name: import.meta.env.VITE_APP_MAP2_NAME || 'OpenTopoMap',
            url: import.meta.env.VITE_APP_MAP2_URL || 'https://tile-{s}.opentopomap.cz/{z}/{x}/{y}.png',
            attribution: import.meta.env.VITE_APP_MAP2_ATTR || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://opentopomap.cz">OpenTopoMap.cz</a>'
        },
        {
            name: import.meta.env.VITE_APP_MAP3_NAME || 'Stadia',
            url: import.meta.env.VITE_APP_MAP3_URL || 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
            attribution: import.meta.env.VITE_APP_MAP3_ATTR || '&copy; <a href="http://stadiamaps.com">Stadia Maps</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    ],
}