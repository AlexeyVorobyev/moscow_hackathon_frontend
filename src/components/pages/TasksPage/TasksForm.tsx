import React, {FC, useLayoutEffect} from 'react'
import {Box, Grid} from '@mui/material'
import {useFormContext} from 'react-hook-form'
import {theme} from '../../Theme/theme'
import {AlexInput} from '../../formUtils/AlexInput/AlexInput'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {extractIds} from '../../functions/extractIds'
import {ITaskPostPutPayload} from '../../../redux/api/types/task'
import {useTasksPostMutation} from '../../../redux/api/tasks.api'
import {AlexDragAndDropFileUploader} from '../../formUtils/AlexDragAndDropFileUploader/AlexDragAndDropFileUploader'

interface IProps {
    setOnSubmitFunc: React.Dispatch<React.SetStateAction<{ callback: ((data: any) => void) | null }>>
    edit: boolean
}

const DEBUG = true
const DEBUG_PREFIX = 'TASK_FORM'
const SUPPORTED_FILE_TYPES = ['JPG', 'MP4']

export const TasksForm: FC<IProps> = ({
                                          setOnSubmitFunc,
                                          edit
                                      }) => {


    const {formState: {errors}, reset} = useFormContext()
    const [searchParams] = useSearchParams()
    const [addTask] = useTasksPostMutation()
    const navigate = useNavigate()

    const add = (data: ITaskPostPutPayload) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data ADD', data)
        // addTask({body: data})
        //     .then((response) => {
        //         console.log(DEBUG_PREFIX, 'promise response', response)
        //         if (searchParams.get('from')) {
        //             navigate(JSON.parse(searchParams.get('from')!))
        //         } else {
        //             navigate('./../table')
        //         }
        //     })
    }

    const onSubmit = (data: any) => {
        DEBUG && console.log(DEBUG_PREFIX, 'data BEFORE processing', data)
        data = extractIds(data)

        DEBUG && console.log(DEBUG_PREFIX, 'data AFTER processing', data)
        add(data)
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
        <Box sx={{
            width: '100%',
            padding: theme.spacing(2),
            boxSizing: 'border-box'
        }}>

            <Grid container spacing={theme.spacing(2)}>
                <Grid item xs={12} lg={6}>
                    <AlexInput name={'name'} label={'Название'}
                               error={Boolean(errors.name)} required
                               errorText={errors.name?.message as string | undefined}/>
                </Grid>
                <Grid item xs={6} lg={0}/>
                <Grid item xs={12} lg={6}>
                    <AlexDragAndDropFileUploader
                        name={'file'} supportedFileTypes={SUPPORTED_FILE_TYPES} required={true}/>
                </Grid>
            </Grid>
        </Box>
    </Box>)
}