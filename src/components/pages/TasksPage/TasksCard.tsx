import {FC, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import {Box, CircularProgress, Grid} from '@mui/material'
import {theme} from '../../Theme/theme'
import {AlexDataView} from '../../formUtils/AlexDataView/AlexDataView'
import {useUserQuery} from '../../../redux/api/users.api'
import {ITaskExpandedEntity} from '../../../redux/api/types/task'
import {useTaskQuery} from '../../../redux/api/tasks.api'

export const TasksCard: FC = () => {
    const [searchParams] = useSearchParams()

    const {
        data,
        isFetching,
        isLoading,
        isSuccess
    } = useTaskQuery({id: searchParams.get('id')!})
    const taskData = useMemo(() => data as ITaskExpandedEntity, [data])

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
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
                        <AlexDataView label={'ID'}>
                            {taskData.id}
                        </AlexDataView>
                    </Grid>
                </Grid>
            </Box>)}
        </Box>
    )
}