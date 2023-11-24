import {CONFIG} from './config'
import {EMainMapLayers} from './components/MapComponents/MainMap/MapData'

export const PROJECT_NAME = 'CLEAR VISION'

export const DEFAULT_VALUES_MAIN_MAP = new Map([
    [EMainMapLayers.cameras, true],
    [EMainMapLayers.routes, false],
    [EMainMapLayers.garbages, false],
    ['coords', [CONFIG.defaultMapLat, CONFIG.defaultMapLon]],
    ['zoom', CONFIG.defaultMapZoom],
    ['baseLayer', CONFIG.mapLayersConfig[0].name],
    ['grayscale', false],
    ['clusters', true]
] as [string, any][])