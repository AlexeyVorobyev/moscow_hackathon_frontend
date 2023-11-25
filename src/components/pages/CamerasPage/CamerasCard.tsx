import React, {FC, ReactNode, useCallback, useLayoutEffect, useMemo} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {Box, Button, CircularProgress, Grid, Typography} from '@mui/material'
import {theme} from '../../Theme/theme'
import {AlexDataView} from '../../formUtils/AlexDataView/AlexDataView'
import {useCameraQuery} from '../../../redux/api/cameras.api'
import {ICameraExpandedEntity} from '../../../redux/api/types/cameras'
import {ICoordinates, serializeICoordinatesEntity} from '../../../redux/api/types/resources'

interface IProps {
    setCustomController: React.Dispatch<React.SetStateAction<ReactNode>>
}

export const CamerasCard: FC<IProps> = ({
                                            setCustomController
                                        }) => {
    const [searchParams] = useSearchParams()

    const {
        data,
        isFetching,
        isLoading,
        isSuccess
    } = useCameraQuery({id: searchParams.get('id')!})
    const cameraData = useMemo(() => data?.response as ICameraExpandedEntity, [data])

    const navigate = useNavigate()

    const navigateToMapComponent = useCallback(() => (
        <Button variant={'contained'}
                onClick={() => {
                    const searchParams = new URLSearchParams([
                        ['coords', JSON.stringify([cameraData.coordinates.lat, cameraData.coordinates.lon])],
                        ['toOpen', cameraData.id],
                        ['zoom', '10'],
                        ['cameras', true]
                    ] as [string, any][])
                    navigate(`/mainMap?${searchParams.toString()}`)
                }}>
            <Typography variant={'button'}>Просмортеть на карте</Typography>
        </Button>
    ), [cameraData])

    useLayoutEffect(() => {
        if (cameraData) {
            setCustomController(
                navigateToMapComponent()
            )
        }
    }, [cameraData])

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
                            {cameraData.id.toString()}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Название'}>
                            {cameraData.name}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Адрес'}>
                            {cameraData.address}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Количество нарушений'}>
                            {cameraData.violationsAmount?.toString()}
                        </AlexDataView>
                    </Grid>
                    <Grid item xs={6}>
                        <AlexDataView label={'Координаты'}>
                            {cameraData.coordinates && serializeICoordinatesEntity(cameraData.coordinates)}
                        </AlexDataView>
                    </Grid>
                </Grid>
            </Box>)}
        </Box>
    )
}