export enum ESort {
    ascending = 'ASC',
    descending = 'DESC'
}

export interface ICoordinates {
    lat: number
    lon: number
}

export const serializeICoordinatesEntity = (entity:ICoordinates) => {
    return `${entity.lat} ${entity.lat ? 'c.ш.' : 'ю.ш.'} \ ${entity.lon} ${entity.lon ? 'в.д.' : 'з.д.'}`
}