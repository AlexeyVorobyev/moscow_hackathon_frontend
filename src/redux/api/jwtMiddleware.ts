import type {Middleware} from '@reduxjs/toolkit'
import {isRejectedWithValue} from '@reduxjs/toolkit'
import {api} from './api'
import {ILoginResponse, IRefreshPayload} from './types/auth'
import {getTokens} from '../../components/functions/getAuthToken'
import {userSlice} from '../store/user/user.slice'

export const jwtMiddleware: Middleware =
    (state) => (next: any) => (action: any) => {
        // console.log(action)
        // if (action && action.type === 'api/executeQuery/pending') {
        //     if (!localStorage.getItem('expiry')) return next(action)
        //     if (parseInt(localStorage.getItem('expiry')!) > Date.now()) return next(action)
        //
        //     localStorage.clear()
        //     state.dispatch(userSlice.actions.setLogin(false))
        //
        //     // state.dispatch(
        //     //     // @ts-ignore       `           `
        //     //     api.endpoints.refresh.initiate({refreshToken: getTokens().refreshToken} as IRefreshPayload)
        //     // )
        // }
        // else {
        //     return
        // }
        // if (action && action.type === 'api/executeQuery/pending') {
        //     if (parseInt(localStorage.getItem('expiry')!) > Date.now() + 5000) {
        //         return next(action)
        //     }
        //
        // }
        // else {
        //     return next(action)
        // }
        if (action && isRejectedWithValue(action)) {
            // Catch the authorization error and refresh the tokens
            console.warn('We got a rejected action!', action.payload.status)
            if (action.payload.status === 401) {

                state.dispatch(
                    // @ts-ignore       `           `
                    api.endpoints.refresh.initiate({refreshToken: getTokens().refreshToken} as IRefreshPayload)
                ).then((response:any) => {
                    console.log(response,'lolol')
                    if (response.hasOwnProperty('error')) {
                        localStorage.clear()
                    }
                    else {
                        if (response.data) {
                            const res = response.data as ILoginResponse
                            console.log(res,'lolol')
                            localStorage.setItem('accessToken', res.response.accessToken)
                            localStorage.setItem('refreshToken', res.response.refreshToken)
                            localStorage.setItem('expiry', res.response.expiry.toString())
                            location.reload()
                        }
                    }
                })
            }
        }
        // @ts-ignore
        return next(action)
    }