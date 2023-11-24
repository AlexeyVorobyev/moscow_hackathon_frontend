import React, {FC, useEffect} from "react";
import {IUseServerSideOptions, TServerSideOptions} from "../../functions/usePageState";
import {FormProvider, useForm} from "react-hook-form";
import {AlexInput} from "../../formUtils/AlexInput/AlexInput";
import {Box, Stack, ToggleButton} from "@mui/material";
import {theme} from "../../Theme/theme";
import TuneIcon from '@mui/icons-material/Tune';
import {grey} from '@mui/material/colors';
import {useDebounce} from "../../functions/useDebounce";
import SearchIcon from '@mui/icons-material/Search';
import Control from "react-leaflet-custom-control";

interface IProps extends IUseServerSideOptions {
    collapsedFilters: boolean
    setCollapsedFilters: React.Dispatch<React.SetStateAction<boolean>>
}

export const MapSearch: FC<IProps> = ({
                                          serverSideOptions,
                                          setServerSideOptions,
                                          collapsedFilters,
                                          setCollapsedFilters
                                      }) => {
    const methods = useForm({mode: "all"})
    const {watch} = methods

    const debouncedSetServerSideOptions = useDebounce(setServerSideOptions, 800)

    useEffect(() => {
        watch((value) => {
            console.debug('MAP_FILTERS VALUE', value)
            debouncedSetServerSideOptions((prev: TServerSideOptions) => {
                prev.set('simpleFilter', value.simpleFilter)
                return new Map(prev)
            })
        })
    }, [])

    return (
        <Control position={'topright'}>
            <FormProvider {...methods}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'start',
                    position: 'relative',
                    zIndex: 5000,
                    right:'-10px'
                }}>
                    <Stack direction={'row'} spacing={theme.spacing(4)}
                           padding={theme.spacing(2)} alignItems={'center'}
                           width={'400px'} justifyContent={'end'} position={'relative'} zIndex={10000}>
                        <Box sx={{background: grey['50'], borderRadius: '5px'}}>
                            <ToggleButton selected={!collapsedFilters} value={'collapsed'}
                                          onChange={() => setCollapsedFilters(!collapsedFilters)}>
                                <TuneIcon color={'secondary'}/>
                            </ToggleButton>
                        </Box>
                        <AlexInput name={'simpleFilter'} label={'Поиск'}
                                   variant={'outlined'} defaultValue={serverSideOptions.get('simpleFilter')}
                                   style={{
                                       borderRadius: '5px',
                                       background: grey['50']
                                   }}
                                   endAdornment={
                                       <SearchIcon/>
                                   }/>
                    </Stack>
                </Box>
            </FormProvider>
        </Control>
    )
}