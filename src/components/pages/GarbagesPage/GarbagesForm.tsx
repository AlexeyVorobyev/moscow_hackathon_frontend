import React, {FC, useLayoutEffect} from "react";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {theme} from "../../Theme/theme";
import {AlexInput} from "../../formUtils/AlexInput/AlexInput";
import {useNavigate, useSearchParams} from "react-router-dom";
import {extractIds} from "../../functions/extractIds";
import {useGarbagePostMutation, useGarbagePutMutation, useLazyGarbageQuery} from "../../../redux/api/garbages.api";
import {IGarbagePostPutPayload} from "../../../redux/api/types/garbages";

interface IProps {
    setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
    edit: boolean
}

const DEBUG = true
const DEBUG_PREFIX = 'GARBAGE_FORM'

export const GarbagesForm: FC<IProps> = ({
                                                 setOnSubmitFunc,
                                                 edit
                                             }) => {


    const {formState: {errors}, reset} = useFormContext()
    const [searchParams] = useSearchParams()
    const [addGarbage] = useGarbagePostMutation()
    const [updateGarbage] = useGarbagePutMutation()
    const [lazyGarbageQuery, result] = useLazyGarbageQuery()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (edit) {
            lazyGarbageQuery({id: searchParams.get('id')!})
                .then((response) => {
                    console.log(DEBUG_PREFIX, 'query response', response)
                    const data = {
                        ...response.data,
                    }
                    console.log(DEBUG_PREFIX, 'query after processing', data)
                    reset(data)
                })
        }
    }, [])

    const update = (data: IGarbagePostPutPayload) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data UPDATE', data)
        updateGarbage({id: searchParams.get('id')!, body: data})
            .then((response) => {
                console.log(DEBUG_PREFIX, 'promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const add = (data: IGarbagePostPutPayload) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data ADD', data)
        addGarbage({body: data})
            .then((response) => {
                console.log(DEBUG_PREFIX, 'promise response', response)
                if (searchParams.get('from')) {
                    navigate(JSON.parse(searchParams.get('from')!))
                } else {
                    navigate('./../table')
                }
            })
    }

    const onSubmit = (data: any) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data BEFORE processing', data)
        data = extractIds(data)

        if (edit) {
            DEBUG && console.log(DEBUG_PREFIX, 'data AFTER processing', data)
            update(data)
        } else {
            data.priority = 0
            DEBUG && console.log(DEBUG_PREFIX, 'data AFTER processing', data)
            add(data)
        }
    }

    useLayoutEffect(() => {
        setOnSubmitFunc({callback: onSubmit})
    }, [])

    return (<Box sx={{
        width: '100%',
        display: 'flex',
        flex: 1,
        overflowY: 'scroll',
    }}>
        {(edit && !result.data) && (<Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress/>
        </Box>)}
        {(!edit || result.data) && (<Box sx={{
            width: '100%',
            padding: theme.spacing(2),
            boxSizing: 'border-box'
        }}>
            <Grid container spacing={theme.spacing(2)}>
                <Grid item xs={6}>
                    <AlexInput name={'name'} label={'Название'}
                               error={Boolean(errors.name)} required
                               errorText={errors.name?.message as string | undefined}/>
                </Grid>
                <Grid item xs={6}>
                    <AlexInput name={'garbageType'} label={'Вид свалки'}
                               error={Boolean(errors.garbageType)} required
                               errorText={errors.garbageType?.message as string | undefined}/>
                </Grid>
                <Grid item xs={6}>
                    <AlexInput name={'photo'} label={'Фото (ссылка)'}/>
                </Grid>
                <Grid item xs={6}/>
            </Grid>
        </Box>)}
    </Box>)
}