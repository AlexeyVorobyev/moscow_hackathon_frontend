import {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store/store'

export const useLoginStatus = () => {
    const checkStatus = useCallback(() => {
        return (
            Boolean(localStorage.getItem('accessToken')) &&
            Boolean(localStorage.getItem('refreshToken')) &&
            Boolean(localStorage.getItem('expiry'))
        )
    },[localStorage])

    const [loginStatus,setLoginStatus] = useState<boolean>(checkStatus())
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        setLoginStatus(checkStatus())
    }, [user.isAuth])

    return loginStatus
}

