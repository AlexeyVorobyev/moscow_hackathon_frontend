import {CONFIG} from "../../../config";

export interface IMapBackground {
    name: string
    url: string
    attribution?: string
}

export const mapBackground: IMapBackground[] = [
    ...CONFIG.mapLayersConfig,
]
