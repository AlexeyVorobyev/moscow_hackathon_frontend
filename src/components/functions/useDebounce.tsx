import { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from './debounce'
/*
* Хук для упрощения применения функции debounce через middleware useState
* */
export const useDebounce = (functionToDebounce: Function, delay: number) => {
    const [middleware, setMiddleware] = useState<any[]>()
    const mountedRef = useRef<boolean>(false)

    useEffect(() => {
        console.debug('SET_DEBOUNCED_VALUE',middleware)
        if (!mountedRef.current) {
            mountedRef.current = true
            return
        }
        if (middleware) {
            functionToDebounce(...middleware)
        }
        else if (middleware !== undefined) {
            functionToDebounce()
        }
    }, [middleware])

    const debounced = useCallback(debounce(setMiddleware, delay), [])

    return (...args: any) => debounced(args || null)
}