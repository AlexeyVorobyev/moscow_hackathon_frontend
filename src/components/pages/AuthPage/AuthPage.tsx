import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Button, Grid, Paper, Stack} from '@mui/material'
import {AlexInput} from '../../formUtils/AlexInput/AlexInput'
import {useAuthMutation} from '../../../redux/api/auth.api'
import {useActions} from '../../../redux/hooks/useActions'
import logoIcon from '../../../assets/logo/authLogo.svg'
import {theme} from '../../Theme/theme'
import {ILoginResponse} from '../../../redux/api/types/auth'

export const AuthPage: React.FC<any> = () => {

    const methods = useForm()
    const {handleSubmit, formState: {errors}} = methods
    const [auth] = useAuthMutation()
    const {setLogin} = useActions()

    const onSubmit = (data: any) => {
        console.log(data)
        auth(data)
            .then((response: any) => {
                console.log(response)
                if (response.data) {
                    const res = response.data as ILoginResponse
                    localStorage.setItem('accessToken', res.response.accessToken)
                    localStorage.setItem('refreshToken', res.response.refreshToken)
                    localStorage.setItem('expiry', res.response.expiry.toString())
                    setLogin(true)
                }
            })
    }

    return (
        <Grid container justifyContent={'center'} height={'100vh'}>
            <Grid item width={'400px'}>
                <Stack direction={'column'} spacing={theme.spacing(2)} padding={theme.spacing(2)}>
                    <img src={logoIcon} alt={'Clear Vision'}/>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 3,
                        }}
                    >
                        <FormProvider {...methods} >
                            <Stack direction={'column'} justifyContent={'center'} spacing={2}>
                                <AlexInput name={'email'} required label={'Почта'}
                                           error={Boolean(errors.email)} defaultValue={'admin@admin.com'}
                                           errorText={errors.email?.message as string | undefined}/>

                                <AlexInput name={'password'} required label={'Пароль'} hidden
                                           error={Boolean(errors.password)} defaultValue={'admin'}
                                           errorText={errors.email?.message as string | undefined}/>

                                <Button size={'large'} variant="contained"
                                        onClick={handleSubmit(onSubmit)}>ВОЙТИ</Button>
                            </Stack>
                        </FormProvider>
                    </Paper>
                </Stack>
            </Grid>
        </Grid>
    )
}
