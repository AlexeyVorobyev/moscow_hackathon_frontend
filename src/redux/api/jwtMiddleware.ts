import type {Middleware} from '@reduxjs/toolkit'
import {isRejectedWithValue} from '@reduxjs/toolkit'
import {api} from './api'
import {ILoginResponse, IRefreshPayload} from './types/auth'
import {getTokens} from '../../components/functions/getAuthToken'

export const jwtMiddleware: Middleware =
    (state) => (next: any) => (action: any) => {
        if (action && isRejectedWithValue(action)) {
            console.warn('We got a rejected action!', action.payload.status)
            if (action.payload.status === 401) {
                state.dispatch(
                    // @ts-ignore
                    api.endpoints.refresh.initiate({refreshToken: getTokens().refreshToken} as IRefreshPayload)
                ).then((response: any) => {
                    if (response.hasOwnProperty('error')) {
                        localStorage.clear()
                    } else if (response.data) {
                        const res = response.data as ILoginResponse
                        localStorage.setItem('accessToken', res.response.accessToken)
                        localStorage.setItem('refreshToken', res.response.refreshToken)
                        localStorage.setItem('expiry', res.response.expiry.toString())
                        location.reload()
                    }
                })
            }
        }
        // @ts-ignore
        return next(action)
    }