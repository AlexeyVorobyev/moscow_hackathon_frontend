import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button, Grid, Paper, Stack} from "@mui/material";
import {AlexInput} from "../../formUtils/AlexInput/AlexInput";
import {useAuthMutation, useMeMutation} from "../../../redux/api/auth.api";

export const AuthPage: React.FC<any> = () => {

    const methods = useForm()
    const {handleSubmit, formState: {errors}} = methods
    const [auth] = useAuthMutation()
    const [me] = useMeMutation()
    // const {setLogin} = useActions()

    const onSubmit = (data: any) => {
        console.log(data)
        auth(data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        me(null)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'}>
            <Grid item width={'400px'}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 3,
                    }}
                >
                    <FormProvider {...methods} >
                        <Stack direction={'column'} justifyContent={'center'} spacing={2}>
                            <AlexInput name={'username'} required label={'Логин'}
                                       error={Boolean(errors.login)}
                                       errorText={errors.login?.message as string | undefined}/>

                            <AlexInput name={'password'} required label={'Пароль'} hidden
                                       error={Boolean(errors.password)}
                                       errorText={errors.password?.message as string | undefined}/>

                            <Button size={'large'} variant="contained"
                                    onClick={handleSubmit(onSubmit)}>ВОЙТИ</Button>
                        </Stack>
                    </FormProvider>
                </Paper>
            </Grid>
        </Grid>
    )
}
