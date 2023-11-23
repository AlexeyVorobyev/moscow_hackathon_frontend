import {ESort} from "../../../redux/api/types/resources";
import {ICamerasPayload} from "../../../redux/api/types/cameras";

export const varsBehaviourMapViolations = (initialVars: any) => {

    console.debug('DEBUG INITIAL_VARS', initialVars)
    let resSort: string = ""

    if (initialVars.sort) {
        const sortObj = Object.fromEntries(initialVars.sort)
        for (const key of Object.keys(sortObj)) {
            if (sortObj![key] === 'asc') {
                resSort += (`&sort=${key}|${ESort.ascending}`)
            } else {
                resSort += (`&sort=${key}|${ESort.descending}`)
            }
        }
        resSort = resSort.replace('&sort=', '')
    }

    const mutatedVars = {
        ...(initialVars.page && {page: Number(initialVars.page)}),
        ...(initialVars.perPage && {size: Number(initialVars.perPage)}),
        ...(initialVars.sort && {sort: resSort}),
        ...(initialVars.simpleFilter && {filter: initialVars.simpleFilter}),
    } as ICamerasPayload

    console.debug('DEBUG MUTATED_VARS', mutatedVars)

    return mutatedVars
}