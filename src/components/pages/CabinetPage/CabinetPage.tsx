import {FC, useMemo} from 'react'
import {Box, CircularProgress, Grid} from '@mui/material'
import {theme} from '../../Theme/theme'
import {useTaskQuery} from '../../../redux/api/tasks.api'
import {ITaskExpandedEntity} from '../../../redux/api/types/task'
import {useMeQuery} from '../../../redux/api/auth.api'
import {IMeEntity} from '../../../redux/api/types/auth'
import {AlexDataView} from '../../formUtils/AlexDataView/AlexDataView'

interface IProps {
}

export const CabinetPage: FC<IProps> = () => {

    const {
        data,
        isFetching,
        isLoading,
        isSuccess
    } = useMeQuery({})
    const meData = useMemo(() => data?.response as IMeEntity, [data])

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            height:'100%',
            flex: 1,
            overflowY: 'scroll',
        }}>
            {(isLoading || isFetching || !isSuccess) && (<Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress/>
            </Box>)}
            {(!isLoading && !isFetching && isSuccess) && (<Box sx={{
                width: '100%',
                padding: theme.spacing(2),
                boxSizing: 'border-box'
            }}>
                <Grid container spacing={theme.spacing(2)}>
                    <Grid item xs={6}>
                        <AlexDataView label={'UUID'}>
                            {meData.uuid}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}/>
                    <Grid item xs={6}>
                        <AlexDataView label={'Электронная Почта'}>
                            {meData.mail}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Имя'}>
                            {meData.name}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Фамилия'}>
                            {meData.surname}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Отчество'}>
                            {meData.patronymic}
                        </AlexDataView>
                    </Grid>
                </Grid>
            </Box>)}
        </Box>
    )
}