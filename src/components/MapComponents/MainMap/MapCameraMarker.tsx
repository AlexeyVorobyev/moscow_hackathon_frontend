import React, {FC, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {MarkerEnchanced} from '../Utils/MarkerEnchanced'
import {theme} from '../../Theme/theme'
import {Button, IconButton, Paper, Stack, Typography} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import {Tooltip} from 'react-leaflet'
import {ICoordinates, serializeICoordinatesEntity} from '../../../redux/api/types/resources'
import CloseIcon from '@mui/icons-material/Close'
import {AlexDataView} from '../../formUtils/AlexDataView/AlexDataView'
import {useNavigate} from 'react-router-dom'
import {IUseServerSideOptions} from '../../functions/usePageState'

export interface IMapMarkerData {
    id: number
    coordinates: ICoordinates
    name: string
    address: string
    violationsAmount: number
}

interface IProps extends IUseServerSideOptions {
    markerData: IMapMarkerData
    closeAll: boolean
    triggerCloseAll: React.DispatchWithoutAction
    setPopupElement: React.Dispatch<React.SetStateAction<React.ReactNode>>
}

export const MapCameraMarker: FC<IProps> = ({
                                                markerData,
                                                closeAll,
                                                triggerCloseAll,
                                                setPopupElement,
                                                serverSideOptions,
                                                setServerSideOptions
                                            }) => {

    const [open, setOpen] = useState<boolean>(false)
    const refMaintainOpen = useRef<boolean>(false)

    useEffect(() => {
        if (refMaintainOpen.current) {
            refMaintainOpen.current = false
        } else {
            setOpen(false)
            if (markerData.id.toString() !== serverSideOptions.get('toOpen')) {
                return
            }
            setServerSideOptions((prev) => {
                prev.delete('toOpen')
                return new Map(prev)
            })
        }
    }, [closeAll])

    useLayoutEffect(() => {
        console.debug(serverSideOptions.get('toOpen'))
        if (markerData.id.toString() !== serverSideOptions.get('toOpen')?.toString() || open) {
            return
        }
        refMaintainOpen.current = true
        setOpen(!open)
        setPopupElement(<PopupElement/>)
    }, [serverSideOptions])

    const navigate = useNavigate()

    const PopupElement = useCallback(() => (
        <Paper elevation={1} sx={{padding: theme.spacing(2), boxSizing: 'border-box', minWidth: '400px'}}>
            <Stack direction={'column'} spacing={theme.spacing(2)} height={'100%'}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant={'h5'}>Камера {markerData.name}</Typography>
                    <IconButton size={'small'} onClick={() => {
                        setOpen(!open)
                        setPopupElement(null)
                        triggerCloseAll()
                        if (markerData.id.toString() !== serverSideOptions.get('toOpen')) {
                            return
                        }
                        setServerSideOptions((prev) => {
                            prev.delete('toOpen')
                            return new Map(prev)
                        })
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </Stack>
                <Stack sx={{
                    flex: 1,
                }} spacing={theme.spacing(1)}>
                    <AlexDataView label={'Адрес'}>
                        {markerData.address}
                    </AlexDataView>
                    <AlexDataView label={'Количество нарушений'}>
                        {markerData.violationsAmount?.toString()}
                    </AlexDataView>
                    <AlexDataView label={'Координаты'}>
                        {markerData.coordinates && serializeICoordinatesEntity(markerData.coordinates)}
                    </AlexDataView>
                </Stack>
                <Stack direction={'row'} justifyContent={'end'} spacing={theme.spacing(2)}>
                    <Button variant={'outlined'} color={'neutral'} onClick={() => {
                        setOpen(!open)
                        setPopupElement(null)
                        triggerCloseAll()
                        if (markerData.id.toString() !== serverSideOptions.get('toOpen')) {
                            return
                        }
                        setServerSideOptions((prev) => {
                            prev.delete('toOpen')
                            return new Map(prev)
                        })
                    }}>
                        <Typography variant={'button'}
                                    color={theme.palette.neutral.notContrastText}>Закрыть</Typography>
                    </Button>
                    <Button variant={'contained'}
                            onClick={() => {
                                const searchURL = new URLSearchParams(location.search)
                                searchURL.set('toOpen', markerData.id.toString())
                                const updatedFrom = JSON.stringify(
                                    location.pathname + '?'
                                    + searchURL.toString())
                                const searchParams = new URLSearchParams([
                                    ['id', markerData.id.toString()],
                                    ['from', updatedFrom]
                                ]).toString()
                                navigate(`/customization/cameras/view?${searchParams}`)
                            }}>
                        <Typography variant={'button'}>Подробнее</Typography>
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    ), [])

    return (
        <MarkerEnchanced
            eventHandlers={{
                click: () => {
                    refMaintainOpen.current = true
                    setOpen(!open)
                    triggerCloseAll()
                    setPopupElement(open ? null : <PopupElement/>)
                    setServerSideOptions((prev) => {
                        if (open) {
                            prev.delete('toOpen')
                        } else {
                            prev.set('toOpen', markerData.id.toString())
                        }
                        return new Map(prev)
                    })
                }
            }}
            position={[markerData.coordinates.lat, markerData.coordinates.lon]}
            icon={!open ? (
                <IconButton>
                    <CameraAltIcon style={{color: theme.palette.secondary.main}}/>
                </IconButton>
            ) : (
                <IconButton>
                    <CircleIcon style={{color: theme.palette.primary.main}}/>
                </IconButton>
            )}>
            {!open && (
                <Tooltip direction={'top'} offset={[0, -20]}>
                    <Typography variant={'subtitle1'}>{markerData.name}</Typography>
                </Tooltip>
            )}
        </MarkerEnchanced>
    )
}