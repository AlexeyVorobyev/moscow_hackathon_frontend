import React, {FC, useState} from "react";
import {IUseServerSideOptions} from "../../functions/usePageState";
import {FormProvider, useForm} from "react-hook-form";
import {AlexInput} from "../../formUtils/AlexInput/AlexInput";
import {Box, IconButton, Stack} from "@mui/material";
import {theme} from "../../Theme/theme";
import TuneIcon from '@mui/icons-material/Tune';

interface IProps extends IUseServerSideOptions {

}

export const MapFilters: FC<IProps> = ({
                                           serverSideOptions,
                                           setServerSideOptions
                                       }) => {
    const methods = useForm({mode: "all"})
    const [collapsed, setCollapsed] = useState<boolean>(true)

    return (
        <FormProvider {...methods}>
            <Box sx={{
                width:'100%',
                height:'100%',
                display:'flex',
                justifyContent:'end',
                alignItems:'start'
            }}>
                {collapsed
                    ? (
                        <Stack direction={'row'} spacing={theme.spacing(2)}
                               padding={theme.spacing(2)} alignItems={'center'}
                               width={'25vw'} justifyContent={'end'} position={'relative'} zIndex={10000}>
                            <IconButton size={'small'} onClick={(prev) => setCollapsed(!prev)}>
                                <TuneIcon color={'secondary'}/>
                            </IconButton>
                            <AlexInput name={'simpleFilter'} label={'Поиск'} />
                        </Stack>
                    )
                    : (<>

                    </>)}
            </Box>
        </FormProvider>
    )
}