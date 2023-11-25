export const varsBehaviourMapMainMap = (initialVars: any) => {

    console.debug('DEBUG INITIAL_VARS', initialVars)

    const mutatedVars = {
        bounds: initialVars.bounds,
        ...(initialVars.simpleFilter && {filter: initialVars.simpleFilter})
        // ...(initialVars.perPage && {size: Number(initialVars.perPage)}),
        // ...(initialVars.sort && {sort: resSort}),
        // ...(initialVars.simpleFilter && {filter: initialVars.simpleFilter}),
    }

    console.debug('DEBUG MUTATED_VARS', mutatedVars)

    return mutatedVars
}