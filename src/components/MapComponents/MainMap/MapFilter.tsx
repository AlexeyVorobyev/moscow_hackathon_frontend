import React, {FC, useEffect, useRef} from "react";
import {IUseServerSideOptions} from "../../functions/usePageState";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {theme} from "../../Theme/theme";
import {grey} from '@mui/material/colors';
import {useDebounce} from "../../functions/useDebounce";
import L from "leaflet";
import Control from "react-leaflet-custom-control";
import Checkbox from "@mui/material/Checkbox";
import {EMainMapLayers} from "./MapData";

interface IProps extends IUseServerSideOptions {
    collapsedFilters: boolean
}

export const MapFilter: FC<IProps> = ({
                                          serverSideOptions,
                                          setServerSideOptions,
                                          collapsedFilters,
                                      }) => {
    const methods = useForm({mode: "all"})
    const {watch} = methods

    const debouncedSetServerSideOptions = useDebounce(setServerSideOptions, 800)

    useEffect(() => {
        watch((value) => {
            console.debug('MAP_FILTERS VALUE', value)
            // debouncedSetServerSideOptions((prev: TServerSideOptions) => {
            //     prev.set('simpleFilter', value.simpleFilter)
            //     return new Map(prev)
        })
    }, [])

    const divRef = useRef<any>(null)

    useEffect(() => {
        if (divRef.current) {
            L.DomEvent.disableClickPropagation(divRef.current)
        }
    }, [])

    return (
        <FormProvider {...methods}>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'start',
            }}>
                <Box sx={{
                    height: '100%',
                    background: grey['50'],
                    width: collapsedFilters ? '0' : '352px',
                    boxShadow: 2,
                    transition: 'all 1s',
                    boxSizing: 'border-box',
                    zIndex: 500,
                    position: 'relative',
                    cursor: 'initial'
                }} ref={divRef}>
                    <Stack direction={'column'}
                           padding={!collapsedFilters ? theme.spacing(2) : 0}
                           paddingTop={'92px'} boxSizing={'border-box'} spacing={theme.spacing(2)}
                           sx={{
                               flex: 1,
                               height: '100%',
                               transition: 'all 1s'
                           }}>
                        <Stack direction={'column'} spacing={theme.spacing(1)}>
                            <Typography variant={'h6'}>Слои</Typography>
                            <Stack direction={'row'} spacing={theme.spacing(1)} alignItems={'center'}>
                                <Checkbox
                                    checked={serverSideOptions.get(EMainMapLayers.cameras)}
                                    onClick={() => setServerSideOptions((prev) => {
                                        prev.set(
                                            EMainMapLayers.cameras,
                                            !serverSideOptions.get(EMainMapLayers.cameras)
                                        )
                                        return new Map(prev)
                                    })}/>
                                <Typography variant={'subtitle1'}>Камеры</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={theme.spacing(1)} alignItems={'center'}>
                                <Checkbox
                                    checked={serverSideOptions.get(EMainMapLayers.routes)}
                                    onClick={() => setServerSideOptions((prev) => {
                                        prev.set(
                                            EMainMapLayers.routes,
                                            !serverSideOptions.get(EMainMapLayers.routes)
                                        )
                                        return new Map(prev)
                                    })}/>
                                <Typography variant={'subtitle1'}>Маршруты</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={theme.spacing(1)} alignItems={'center'}>
                                <Checkbox
                                    checked={serverSideOptions.get(EMainMapLayers.garbages)}
                                    onClick={() => setServerSideOptions((prev) => {
                                        prev.set(
                                            EMainMapLayers.garbages,
                                            !serverSideOptions.get(EMainMapLayers.garbages)
                                        )
                                        return new Map(prev)
                                    })}/>
                                <Typography variant={'subtitle1'}>Мусорки</Typography>
                            </Stack>
                            <Divider/>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </FormProvider>
    )
}